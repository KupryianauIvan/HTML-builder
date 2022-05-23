const path = require('path');
const { stdout } = require('process');
const { readdir } = require('fs/promises');
const fs = require('fs');

(async function () {
  try {
    const files = await readdir(path.join(__dirname, 'secret-folder'), {
      withFileTypes: true});

    for (const file of files) {
      if (file.isFile()) {
        fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
          if (err) throw err;
          stdout.write(`${file.name.split('.')[0]} - ${path.extname(file.name).slice(1)} - ${stats.size}b\n`);
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
})(path.join(__dirname, 'secret-folder'));
