const { stdin, stdout } = process;
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



