import fs from "node:fs/promises";
import { join } from "node:path";

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

const writeFiles = async (rote: string, name: string, data: string) => {
  try {
    const path = join(rote, name);

    await fs.mkdir(rote, { recursive: true });

    const files = await fs.writeFile(path, data, "utf-8");
    return files;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { readFiles, writeFiles };
