/* const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(
  path.join(__dirname, 'text.txt'), (err) => {
    if (err) throw err;
  }, 'utf-8');

stdout.write('Hello, you can type some words there___\n');

stdin.on('data', chunk => {
  const stringifiedChunk = chunk.toString().trim();

  if (stringifiedChunk === 'exit') {
    process.exit();
  } else {
    output.write(chunk);
  }
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit' , () => stdout.write('Bye dear user\n'));
 */


  
const process = require("process");
const fs = require("fs");
const path = require("path");
const pathFile = path.join(__dirname, "/text.txt");

const output = fs.createWriteStream(pathFile, "utf-8");
process.stdout.write("Write text for file 'text.txt', please\n");
process.stdin.on("data", (data) => {
  if (data.toString().slice(0, 4) === "exit") {
    process.exit();
  } else output.write(data);
});
process.on("SIGINT", () => {
  process.exit();
});
process.on("exit", () => {
  process.stdout.write("Thank you! See you later!");
});