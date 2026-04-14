#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import { Command } from "commander";
import { login, logout, whoami } from "./commands/auth/login.js";
import { wakeUp } from "./commands/ai/wakeUp.js";

async function main() {
  console.log(
    chalk.cyan(
      figlet.textSync("Orion CLI", {
        font: "Standard",
        horizontalLayout: "default",
      })
    )
  );
  console.log(chalk.gray("A Cli based AI tool \n"));

  const program = new Command("orion");

  program
    .version("0.0.1")
    .description("Orion CLI - AI powered terminal assistant");

  program.addCommand(wakeUp);
  program.addCommand(login);
  program.addCommand(logout);
  program.addCommand(whoami);

  program.showHelpAfterError(true);
  program.parse();
}

main().catch((error) => {
  console.error(chalk.red("Error running Orion CLI:"), error);
  process.exit(1);
});
