import chalk from "chalk";
import { Command } from "commander";
import yoctoSpinner from "yocto-spinner";
import { getStoredToken } from "../auth/login.js";
import { select } from "@clack/prompts";
import { startChat } from "../../chat/chat-with-ai.js";
import { startToolChat } from "../../chat/chat-with-ai-tool.js";
import { startAgentChat } from "../../chat/chat-with-ai-agent.js";
import { SERVER_URL } from "../../../config/server.config.js";

const wakeUpAction = async () => {
  const token = await getStoredToken();

  if (!token?.access_token) {
    console.log(chalk.red("Not authenticated. Please run: orion login"));
    return;
  }

  const spinner = yoctoSpinner({ text: "Fetching User Information..." });
  spinner.start();

  let session;
  try {
    const res = await fetch(`${SERVER_URL}/api/me`, {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    session = await res.json();
  } catch {
    spinner.stop();
    console.log(chalk.red("Could not reach server. Is it running?"));
    return;
  }

  spinner.stop();

  if (!session?.user) {
    console.log(chalk.red("User not found. Please run: orion login"));
    return;
  }

  console.log(chalk.green(`\nWelcome back, ${session.user.name}!\n`));

  const choice = await select({
    message: "Select an option:",
    options: [
      { value: "chat", label: "Chat", hint: "Simple chat with AI" },
      { value: "tool", label: "Tool Calling", hint: "Chat with tools" },
      { value: "agent", label: "Agentic Mode", hint: "Advanced AI agent" },
    ],
  });

  switch (choice) {
    case "chat": await startChat("chat"); break;
    case "tool": await startToolChat(); break;
    case "agent": await startAgentChat(); break;
  }
};

export const wakeUp = new Command("wakeup")
  .description("Wake up the AI")
  .action(wakeUpAction);
