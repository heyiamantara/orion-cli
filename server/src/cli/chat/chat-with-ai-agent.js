import chalk from "chalk";
import boxen from "boxen";
import { text, isCancel, intro, outro } from "@clack/prompts";
import yoctoSpinner from "yocto-spinner";
import { getStoredToken } from "../commands/auth/login.js";
import { SERVER_URL } from "../../config/server.config.js";

async function getAuthHeaders() {
  const token = await getStoredToken();
  if (!token?.access_token) throw new Error("Not authenticated. Run: orion login");
  return { Authorization: `Bearer ${token.access_token}`, "Content-Type": "application/json" };
}

export async function startAgentChat() {
  intro(boxen(chalk.bold.cyan("🤖 Orion Agent Mode"), { padding: 1, borderStyle: "double", borderColor: "cyan" }));
  console.log(chalk.gray("Describe what you want to build and the agent will generate it.\n"));

  const userInput = await text({
    message: chalk.blue("🛠️  What do you want to build?"),
    placeholder: "e.g. a React todo app with local storage",
    validate(v) { if (!v?.trim()) return "Please describe what to build"; },
  });

  if (isCancel(userInput)) { process.exit(0); }

  const spinner = yoctoSpinner({ text: "Agent is generating your application...", color: "cyan" }).start();

  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${SERVER_URL}/api/chat/agent`, {
      method: "POST",
      headers,
      body: JSON.stringify({ message: userInput }),
    });

    spinner.stop();

    if (!res.ok) {
      console.log(chalk.red(`Server error: ${res.status}`));
      return;
    }

    const result = await res.json();

    if (result.success) {
      console.log(chalk.green.bold(`\n✨ Application "${result.folderName}" generated!\n`));
      if (result.commands?.length > 0) {
        console.log(chalk.cyan("📋 Next steps:"));
        result.commands.forEach(cmd => console.log(chalk.white(`  ${cmd}`)));
      }
    } else {
      console.log(chalk.red(`\n❌ ${result.error || "Generation failed"}`));
    }
  } catch (error) {
    spinner.stop();
    console.log(chalk.red(`Error: ${error.message}`));
  }

  outro(chalk.green("✨ Done!"));
}
