import fs from "node:fs/promises";
// import { join } from "node:path";

const readFiles = async (path: string) => {
  try {
    const files = await fs.readFile(path, "utf-8");
    console.log(files);
    return files;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const writeFiles = async (rote: string, data: string) => {
  try {
    console.log(rote);

    const path = rote.split(/\\|\//);
    path.pop();

    console.log(path);

    await fs.mkdir(path.join("/"), { recursive: true });

    await fs.writeFile(rote, data, "utf-8");
    return true;
  } catch (error) {
    debugger;
    console.log(error);
    return false;
  }
};

export { readFiles, writeFiles };
