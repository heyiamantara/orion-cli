import chalk from "chalk";
import boxen from "boxen";
import { text, isCancel, intro, outro } from "@clack/prompts";
import yoctoSpinner from "yocto-spinner";
import { marked } from "marked";
import { markedTerminal } from "marked-terminal";
import { getStoredToken } from "../commands/auth/login.js";
import { SERVER_URL } from "../../config/server.config.js";

marked.use(markedTerminal({
  code: chalk.cyan,
  blockquote: chalk.gray.italic,
  heading: chalk.green.bold,
  firstHeading: chalk.magenta.underline.bold,
  hr: chalk.reset,
  listitem: chalk.reset,
  paragraph: chalk.reset,
  strong: chalk.bold,
  em: chalk.italic,
  codespan: chalk.yellow.bgBlack,
  link: chalk.blue.underline,
  href: chalk.blue.underline,
}));

async function getAuthHeaders() {
  const token = await getStoredToken();
  if (!token?.access_token) throw new Error("Not authenticated. Run: orion login");
  return { Authorization: `Bearer ${token.access_token}`, "Content-Type": "application/json" };
}

async function chatLoop(conversationId) {
  console.log(boxen(
    `${chalk.gray('• Type your message and press Enter')}\n${chalk.gray('• Type "exit" to end')}\n${chalk.gray('• Press Ctrl+C to quit')}`,
    { padding: 1, margin: { bottom: 1 }, borderStyle: "round", borderColor: "gray", dimBorder: true }
  ));

  let currentConversationId = conversationId;

  while (true) {
    const userInput = await text({
      message: chalk.blue("💬 Your message"),
      placeholder: "Type your message...",
      validate(value) {
        if (!value || value.trim().length === 0) return "Message cannot be empty";
      },
    });

    if (isCancel(userInput)) {
      console.log(boxen(chalk.yellow("Chat session ended. Goodbye! 👋"), { padding: 1, margin: 1, borderStyle: "round", borderColor: "yellow" }));
      process.exit(0);
    }

    if (userInput.toLowerCase() === "exit") {
      console.log(boxen(chalk.yellow("Chat session ended. Goodbye! 👋"), { padding: 1, margin: 1, borderStyle: "round", borderColor: "yellow" }));
      break;
    }

    const spinner = yoctoSpinner({ text: "AI is thinking...", color: "cyan" }).start();

    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${SERVER_URL}/api/chat`, {
        method: "POST",
        headers,
        body: JSON.stringify({ message: userInput, conversationId: currentConversationId, mode: "chat" }),
      });

      if (!res.ok) {
        spinner.stop();
        console.log(chalk.red(`Server error: ${res.status}`));
        continue;
      }

      // Stream the response
      spinner.stop();
      console.log("\n" + chalk.green.bold("🤖 Assistant:"));
      console.log(chalk.gray("─".repeat(60)));

      let fullResponse = "";
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        // Last chunk has the conversationId JSON, skip rendering it
        if (chunk.startsWith('{"conversationId"')) {
          try { currentConversationId = JSON.parse(chunk).conversationId; } catch {}
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
}

export async function startChat(mode = "chat", conversationId = null) {
  try {
    intro(boxen(chalk.bold.cyan("🚀 Orion AI Chat"), { padding: 1, borderStyle: "double", borderColor: "cyan" }));
    await chatLoop(conversationId);
    outro(chalk.green("✨ Thanks for chatting!"));
  } catch (error) {
    console.log(boxen(chalk.red(`❌ Error: ${error.message}`), { padding: 1, margin: 1, borderStyle: "round", borderColor: "red" }));
    process.exit(1);
  }
}
