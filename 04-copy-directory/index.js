const path = require('path');
const fs = require('fs');
const { mkdir } = require('fs/promises');

(async function () {
  try {
    await mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
      if (err) throw err;
    });
    
    fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
      if (err) throw err;

      for (let item of files) {
        fs.unlink(path.join(path.join(__dirname, 'files-copy'), item) , err => {
          if (err) throw err;
        });
      }});

    fs.readdir(path.join(__dirname, 'files'), (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), err => {
          if (err) throw err;
        });
      });
    });
  } catch (error) {
    console.error(error);
  }
})(path.join(__dirname, 'files'));
