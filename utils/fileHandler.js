import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const filePath = path.join(dirname, "../data/persons.json");

export const readData = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

export const writeData = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};
