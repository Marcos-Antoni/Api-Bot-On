import { prompt } from "enquirer";
import { join } from "node:path";

//componentes
import { BotOn } from "../brain/gpt";
import { writeFiles } from "../brain/fileDriver";
import type { Model, Prompt } from "../types";

const arrayModel: Model[] = ["text-davinci-003", "code-davinci-002"];

const addFiles = async (text: string) => {
  const res = await prompt<Prompt>([
    {
      type: "list",
      name: "files",
      message: "Escribe el nombre de los archivos con su extensión",
    },
  ]);
  if (!res.files[0]) return await BotOn(text, arrayModel[0]);

  const listFiles = res.files.map((file, index) => {
    return `${index === 0 ? "" : index + 1 + "."} ${file}`;
  });
  console.log(listFiles);

  const files = listFiles.join("\n");
  return files;
};

const removeFiles = (text: string) => {
  let files = text.split("\n");

  files.shift();

  files = files.map((file) => {
    return file.replace(/^\d+\. /, "");
  });

  return files;
};

const createFile = async (codes: string) => {
  const route = process.cwd();
  let arrayCode = codes.split('"""');
  arrayCode.pop();

  for (let i = 0; i < arrayCode.length; i += 2) {
    const file = arrayCode[i].replace(/ /g, "").replace(/:/g, "").replace(/\n/g, "");
    const code = arrayCode[i + 1];
    if (!code || !file) {
      console.log("Error");
      break;
    }

    writeFiles(join(route, file), code);
  }

  console.log("Terminado");
};

const createCode = async (message: string) => {
  let text = `si quiero programar esto "${message}" crea nombres del archivo con la extensin nesesaria para que funcione:
1.`;
  const res = await addFiles(text);

  text += `${res}`;
  const files = removeFiles(text);
  text += "\n\n";

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    text += `${file}:
    """`;
    const res = await BotOn(text, arrayModel[1]);
    text += `${res}"""
    `;
  }

  const code = text.split("\n\n")[1];
  createFile(code);
};

export { createCode };
