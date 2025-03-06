import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const fileRemover = (filename) => {
  const filePath = path.join(__dirname, "../uploads", filename);
  
  fs.unlink(filePath, function (err) {
    if (err && err.code === "ENOENT") {
      console.log(`File ${filename} doesn't exist`);
    } else if (err) {
      console.log(`Error occurred while trying to remove file ${filename}:`, err.message);
    } else {
      console.log(`Successfully removed ${filename}`);
    }
  });
};
