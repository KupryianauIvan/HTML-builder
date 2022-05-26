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

/* const fs = require("fs");
const path = require("path");
const pathFile = path.join(__dirname, "secret-folder");
fs.readdir(pathFile, { withFileTypes: true }, (err, arrayFiles) => {
  if (err) throw Error("error");
  else {
    const files = arrayFiles.filter((file) => file.isFile());
    files.forEach((el) => {
      const pathEl = path.join(pathFile, el.name);
      fs.stat(pathEl, (err, stats) => {
        if (err) {
          throw Error();
        }
        console.log(
          `${path.parse(pathEl).name} - ${path.parse(pathEl).ext.slice(1)} - ${(
            stats.size / 1024
          ).toFixed(3)} kb`
        );
      });
    });
  }
}); */