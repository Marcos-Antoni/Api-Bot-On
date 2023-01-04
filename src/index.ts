import { program } from "commander";
import { createCode } from "./fun/createCode";

program
  .version("0.0.1")
  .description("Type in what you need and Bot On Cli will do it for you.");

program
  .command("message <message>")
  .alias("m")
  .description("this command is used to give instructions on what you want to generate ")
  .action(async (message: string) => {
    await createCode(message);
  });

program
  .command("init <route>")
  .alias("i")
  .description("this command is used to initialize a new project")
  .action((route: string) => {
    console.log(`Initializing project in: ${route}`);
  });

program.parse(process.argv);
