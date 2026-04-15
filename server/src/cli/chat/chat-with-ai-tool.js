import chalk from "chalk";
import boxen from "boxen";
import { text, isCancel, intro, outro } from "@clack/prompts";
import yoctoSpinner from "yocto-spinner";
import { marked } from "marked";
import { markedTerminal } from "marked-terminal";
import { getStoredToken } from "../commands/auth/login.js";
import { SERVER_URL } from "../../config/server.config.js";

marked.use(markedTerminal({
  code: chalk.cyan, paragraph: chalk.reset, strong: chalk.bold,
  em: chalk.italic, codespan: chalk.yellow.bgBlack, link: chalk.blue.underline,
}));

async function getAuthHeaders() {
  const token = await getStoredToken();
  if (!token?.access_token) throw new Error("Not authenticated. Run: orion login");
  return { Authorization: `Bearer ${token.access_token}`, "Content-Type": "application/json" };
}

export async function startToolChat() {
  intro(boxen(chalk.bold.cyan("🔧 Orion Tool Chat"), { padding: 1, borderStyle: "double", borderColor: "cyan" }));
  console.log(chalk.gray("Tools: Google Search, Code Execution\n"));

  let conversationId = null;

  while (true) {
    const userInput = await text({
      message: chalk.blue("💬 Your message"),
      placeholder: "Type your message...",
      validate(v) { if (!v?.trim()) return "Message cannot be empty"; },
    });

    if (isCancel(userInput)) { process.exit(0); }
    if (userInput.toLowerCase() === "exit") break;

    const spinner = yoctoSpinner({ text: "AI is thinking...", color: "cyan" }).start();

    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${SERVER_URL}/api/chat/tool`, {
        method: "POST",
        headers,
        body: JSON.stringify({ message: userInput, conversationId }),
      });

      spinner.stop();

      if (!res.ok) { console.log(chalk.red(`Server error: ${res.status}`)); continue; }

      console.log("\n" + chalk.green.bold("🤖 Assistant:"));
      console.log(chalk.gray("─".repeat(60)));

      let fullResponse = "";
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);

        const jsonIndex = chunk.indexOf('{"conversationId"');
        if (jsonIndex !== -1) {
          const textPart = chunk.slice(0, jsonIndex);
          if (textPart) process.stdout.write(textPart);
          try { conversationId = JSON.parse(chunk.slice(jsonIndex)).conversationId; } catch {}
          break;
        }

        fullResponse += chunk;
        process.stdout.write(chunk);
      }

      console.log("\n" + chalk.gray("─".repeat(60)) + "\n");
    } catch (error) {
      spinner.stop();
      console.log(chalk.red(`Error: ${error.message}`));
    }
  }

  outro(chalk.green("✨ Thanks for chatting!"));
}
