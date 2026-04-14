import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";

const CONFIG_DIR = join(homedir(), ".orion");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");

export function getConfig() {
  if (!existsSync(CONFIG_FILE)) return {};
  try {
    return JSON.parse(readFileSync(CONFIG_FILE, "utf-8"));
  } catch {
    return {};
  }
}

export function setConfig(key, value) {
  if (!existsSync(CONFIG_DIR)) mkdirSync(CONFIG_DIR, { recursive: true });
  const current = getConfig();
  current[key] = value;
  writeFileSync(CONFIG_FILE, JSON.stringify(current, null, 2));
}

export function getConfigValue(key) {
  return getConfig()[key];
}
