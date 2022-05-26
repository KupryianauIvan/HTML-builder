/* const path = require('path');
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
 */

/* const fs = require("fs");
const path = require("path");
const pathFrom = path.join(__dirname, "files");
const pathTo = path.join(__dirname, "files-copy");

const handleError = (err) => {
  if (err) {
    console.log(err);
    throw new Error("error");
  }
};

const createFolder = () => {
  fs.mkdir(pathTo, (err) => {
    handleError(err);
  });
};

const copyFiles = () => {
  fs.readdir(pathFrom, { withFileTypes: true }, (err, files) => {
    handleError(err);
    files.forEach((file) => {
      fs.copyFile(
        path.join(pathFrom, file.name),
        path.join(pathTo, file.name),
        (err) => {
          if (err) {
            throw new Error("error");
          }
        }
      );
    });
  });
};

fs.rm(pathTo, { recursive: true, force: true }, () => {
  createFolder();
  copyFiles();
}); */

const fs = require('fs');
const path = require('path');
const srcFolder =  path.resolve(__dirname, 'files');
const copyFolder = path.resolve(__dirname, 'files-copy');

fs.rm(copyFolder, {force:true, recursive: true}, (err) =>{
  if (err) throw err;
  fs.mkdir(copyFolder, {recursive: true}, (err) =>{
    if (err) throw err;
    fs.readdir(srcFolder, {withFileTypes:true}, (err, files) =>{
      files.forEach(file => {
        fs.copyFile(path.resolve(srcFolder, file.name), path.resolve(copyFolder, file.name), (err) => {
          if (err) throw err;
        } );
      });
    });     
  });
});