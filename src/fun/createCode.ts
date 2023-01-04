import { BotOn } from "../brain/gpt";
import { writeFiles } from "../brain/fileDriver";
import type { Model } from "../types";

const arrayModel: Model[] = ["text-davinci-003", "code-davinci-002"];

const removeFiles = (prompt: string) => {
  let files = prompt.split("\n");

  files.shift();

  files = files.map((file) => {
    return file.replace(/^\d+\. /, "");
  });

  return files;
};

const createFile = (codes: string) => {
  const route = process.cwd();
  let arrayCode = codes.split('"""');
  arrayCode.pop();

  for (let i = 0; i < arrayCode.length; i += 2) {
    const file = arrayCode[i].replace(/ /g, "").replace(/:/g, "").replace(/\n/g, "");
    const code = arrayCode[i + 1];

    writeFiles(`${route}/res/`, file, code);
  }

  console.log("Terminado");
};

const createCode = async (message: string) => {
  let prompt = `si quiero programar esto "${message}" crea nombres del archivo con la extensin nesesaria para que funcione:
1.`;
  const res = await BotOn(prompt, arrayModel[0]);

  prompt += `${res}`;
  const files = removeFiles(prompt);
  prompt += "\n\n";

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    prompt += `${file}:
    """`;
    const res = await BotOn(prompt, arrayModel[1]);
    prompt += `${res}"""
    `;
  }

  const code = prompt.split("\n\n")[1];
  // console.log(code);
  createFile(code);
};

export { createCode };
