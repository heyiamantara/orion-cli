import { cancel, confirm, intro, isCancel, outro } from "@clack/prompts";
import { logger } from "better-auth";
import { createAuthClient } from "better-auth/client";
import { deviceAuthorizationClient } from "better-auth/client/plugins";
import chalk from "chalk";
import { Command } from "commander";
import fs from "fs/promises";
import open from "open";
import os from "os";
import path from "path";
import yoctoSpinner from "yocto-spinner";
import * as z from "zod/v4";
import { SERVER_URL } from "../../../config/server.config.js";

const TOKEN_FILE = path.join(os.homedir(), ".orion", "token.json");

// ── Token helpers ──────────────────────────────────────────────

export async function getStoredToken() {
  try {
    return JSON.parse(await fs.readFile(TOKEN_FILE, "utf-8"));
  } catch {
    return null;
  }
}

export async function storeToken(token) {
  try {
    await fs.mkdir(path.dirname(TOKEN_FILE), { recursive: true });
    await fs.writeFile(TOKEN_FILE, JSON.stringify({
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      token_type: token.token_type || "Bearer",
      expires_at: token.expires_in
        ? new Date(Date.now() + token.expires_in * 1000).toISOString()
        : null,
      created_at: new Date().toISOString(),
    }, null, 2));
    return true;
  } catch {
    return false;
  }
}

export async function clearStoredToken() {
  try { await fs.unlink(TOKEN_FILE); return true; } catch { return false; }
}

export async function isTokenExpired() {
  const token = await getStoredToken();
  if (!token?.expires_at) return true;
  return new Date(token.expires_at).getTime() - Date.now() < 5 * 60 * 1000;
}

export async function requireAuth() {
  const token = await getStoredToken();
  if (!token) {
    console.log(chalk.red("❌ Not authenticated. Run: orion login"));
    process.exit(1);
  }
  if (await isTokenExpired()) {
    console.log(chalk.yellow("⚠️  Session expired. Run: orion login"));
    process.exit(1);
  }
  return token;
}

// ── Login ──────────────────────────────────────────────────────

export async function loginAction(opts) {
  const { serverUrl: optUrl, clientId: optClientId } = z.object({
    serverUrl: z.string().optional(),
    clientId: z.string().optional(),
  }).parse(opts);

  const serverUrl = optUrl || SERVER_URL;

  intro(chalk.bold("🔐 Orion Login"));

  const existingToken = await getStoredToken();
  if (existingToken && !(await isTokenExpired())) {
    const reauth = await confirm({ message: "Already logged in. Login again?", initialValue: false });
    if (isCancel(reauth) || !reauth) { cancel("Cancelled"); process.exit(0); }
  }

  const authClient = createAuthClient({ baseURL: serverUrl, plugins: [deviceAuthorizationClient()] });
  const spinner = yoctoSpinner({ text: "Requesting device authorization..." }).start();

  let clientId = optClientId;
  if (!clientId) {
    try {
      const res = await fetch(`${serverUrl}/api/client-id`);
      const data = await res.json();
      clientId = data.clientId;
    } catch {
      spinner.stop();
      console.log(chalk.red("❌ Could not reach server."));
      process.exit(1);
    }
  }

  const { data, error } = await authClient.device.code({
    client_id: clientId,
    scope: "openid profile email",
  });

  spinner.stop();

  if (error || !data) {
    console.log(chalk.red("❌ Failed to get device code."));
    process.exit(1);
  }

  const { device_code, user_code, verification_uri, verification_uri_complete, interval = 5, expires_in } = data;

  console.log(chalk.cyan("\n📱 Visit: ") + chalk.underline.blue(verification_uri_complete || verification_uri));
  console.log(chalk.cyan("🔑 Code:  ") + chalk.bold.green(user_code) + "\n");

  const shouldOpen = await confirm({ message: "Open browser automatically?", initialValue: true });
  if (!isCancel(shouldOpen) && shouldOpen) await open(verification_uri_complete || verification_uri);

  console.log(chalk.gray(`Waiting for authorization (expires in ${Math.floor(expires_in / 60)}m)...`));

  const token = await pollForToken(authClient, device_code, clientId, interval);

  if (token) {
    await storeToken(token);
    const { data: session } = await authClient.getSession({
      fetchOptions: { headers: { Authorization: `Bearer ${token.access_token}` } },
    });
    outro(chalk.green(`✅ Welcome ${session?.user?.name || session?.user?.email || "User"}!`));
  }
}

async function pollForToken(authClient, deviceCode, clientId, initialInterval) {
  let interval = initialInterval;
  const spinner = yoctoSpinner({ text: "Waiting for authorization...", color: "cyan" }).start();

  return new Promise((resolve) => {
    const poll = async () => {
      try {
        const { data, error } = await authClient.device.token({
          grant_type: "urn:ietf:params:oauth:grant-type:device_code",
          device_code: deviceCode,
          client_id: clientId,
        });

        if (data?.access_token) { spinner.stop(); resolve(data); return; }

        if (error) {
          if (error.error === "slow_down") interval += 5;
          else if (error.error !== "authorization_pending") {
            spinner.stop();
            logger.error(error.error_description);
            process.exit(1);
          }
        }
      } catch (err) {
        spinner.stop();
        logger.error(`Network error: ${err.message}`);
        process.exit(1);
      }
      setTimeout(poll, interval * 1000);
    };
    setTimeout(poll, interval * 1000);
  });
}

// ── Logout ─────────────────────────────────────────────────────

export async function logoutAction() {
  intro(chalk.bold("👋 Logout"));
  if (!(await getStoredToken())) { console.log(chalk.yellow("Not logged in.")); process.exit(0); }
  const ok = await confirm({ message: "Sure you want to logout?", initialValue: false });
  if (isCancel(ok) || !ok) { cancel("Cancelled"); process.exit(0); }
  await clearStoredToken();
  outro(chalk.green("✅ Logged out!"));
}

// ── Whoami ─────────────────────────────────────────────────────

export async function whoamiAction() {
  const token = await requireAuth();
  let session;
  try {
    const res = await fetch(`${SERVER_URL}/api/me`, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    session = await res.json();
  } catch {
    console.log(chalk.red("Could not reach server."));
    process.exit(1);
  }
  if (!session?.user) {
    console.log(chalk.red("Could not fetch user. Try logging in again."));
    process.exit(1);
  }
  const { user } = session;
  console.log(chalk.bold.greenBright(`\n👤 ${user.name}\n📧 ${user.email}\n🆔 ${user.id}\n`));
}

// ── Commands ───────────────────────────────────────────────────

export const login = new Command("login")
  .description("Login to Orion")
  .option("--server-url <url>", "Override server URL")
  .option("--client-id <id>", "Override OAuth client ID")
  .action(loginAction);

export const logout = new Command("logout")
  .description("Logout and clear credentials")
  .action(logoutAction);

export const whoami = new Command("whoami")
  .description("Show current user")
  .action(whoamiAction);
