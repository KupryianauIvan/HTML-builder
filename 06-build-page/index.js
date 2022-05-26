/* const fs = require('fs');
const path = require('path');
const { mkdir, rm, readFile, copyFile, writeFile, readdir } = require('fs/promises');
//!Pathes
const projectDistPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'project-dist');
const stylesPath = path.join(__dirname, 'styles');

async function buildPage() {
  //!! Создание и очищение папки project-dist и замена шаблонных тегов
  await rm(projectDistPath, { recursive: true, force: true });
  await mkdir(projectDistPath, (err) => {
    if (err) throw err;
  });

  let template = await readFile(templatePath, 'utf-8');
  const tags = template.match(/{{\s*(\w+)\s*}}/g);

  await copyFile(templatePath, path.join(projectDistPath, 'index.html'));
  for (const tag of tags) {
    let fileName = tag.replace(/[{}]/g, '') + '.html';
    let fileContent = await readFile(
      path.join(__dirname, 'components', fileName),
      'utf-8'
    );
    template = template.replace(tag, fileContent);
  }
  await writeFile(path.join(projectDistPath, 'index.html'), template);

  //!! Создание style.css
  const output = fs.createWriteStream(path.join(componentsPath, 'style.css'));

  fs.readdir(stylesPath, { withFileTypes: true },  (err, styles) => {
    if (err) throw err;

    for (let style of styles) {
      const stylePath = path.join(stylesPath, style.name);

      const input = fs.createReadStream(stylePath, 'utf-8');
      if (style.isFile() && path.extname(style.name) === '.css') {
        input.pipe(output);
      }
    }
  }
  );
  const assetsPath = path.join(__dirname, 'assets');
  const assetsCopyPath = path.join(__dirname, 'project-dist/assets');

  async function copyDir(assetsPath, assetsCopyPath) {
    try {
      await mkdir(assetsCopyPath, { recursive: true }, (err) => {
        if (err) throw err;
      });
      
      const files = await readdir(assetsPath, { withFileTypes: true}, err => {
        if (err) throw err;
      });
  
      for (const item of files) {
        const assetsFilePath = path.join(assetsPath, item.name);
        const assetsFileCopyPath = path.join(assetsCopyPath, item.name);
        if (!item.isFile()) {
          await copyDir(assetsFilePath, assetsFileCopyPath);
        } else {
          await copyFile(assetsFilePath, assetsFileCopyPath);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  copyDir(assetsPath, assetsCopyPath);
}

buildPage();

 */

/* const fs = require("fs");
const path = require("path");

const pathTemplate = path.join(__dirname, "template.html");
const pathProject = path.join(__dirname, "project-dist");
const pathIndex = path.join(pathProject, "index.html");
const pathStyles = path.join(__dirname, "styles");
const pathAssetsFrom = path.join(__dirname, "assets");
const pathAssetsTo = path.join(pathProject, "assets");

const fileNameStyles = "style.css";
const regexp = /{{[a-z]+}}/g;

async function createProjectFolder() {
  await fs.promises.rm(pathProject, { recursive: true, force: true }, () => {});
  fs.mkdir(pathProject, { recursive: true }, () => {});
  fs.copyFile(pathTemplate, pathIndex, () => {});
}

async function changeTemplate() {
  const template = await fs.promises.readFile(pathTemplate, "utf-8");
  const tagsName = template.match(regexp);
  for (let name of tagsName) {
    const tagContent = await fs.promises.readFile(
      path.join(
        __dirname,
        "components",
        `${name.slice(2, name.length - 2) + ".html"}`
      ),
      "utf-8"
    );
    let indexHtml = await fs.promises.readFile(pathIndex, "utf-8");
    let changeIndex = indexHtml.replace(name, tagContent);
    await fs.promises.writeFile(pathIndex, changeIndex);
  }
}

function createStyles() {
  fs.readdir(pathStyles, { withFileTypes: true }, (err, files) => {
    const streamWr = new fs.WriteStream(
      path.join(pathProject, fileNameStyles),
      "utf-8"
    );
    files.forEach((file) => {
      if (file.isFile() && path.extname(file.name) === ".css") {
        const stream = new fs.ReadStream(
          path.join(pathStyles, file.name),
          "utf-8"
        );
        stream.pipe(streamWr);
      }
    });
  });
}

async function copyAssets() {
  await fs.promises.rm(
    pathAssetsTo,
    { recursive: true, force: true },
    () => {}
  );
  fs.mkdir(pathAssetsTo, { recursive: true }, () => {});
  fs.readdir(pathAssetsFrom, { withFileTypes: true }, (err, dir) => {
    dir.forEach((folder) => {
      fs.mkdir(
        path.join(pathAssetsTo, folder.name),
        { recursive: true },
        () => {
          fs.readdir(
            path.join(pathAssetsFrom, folder.name),
            { withFileTypes: true },
            (err, files) => {
              files.forEach((file) => {
                fs.copyFile(
                  path.join(pathAssetsFrom, folder.name, file.name),
                  path.join(pathAssetsTo, folder.name, file.name),
                  () => {}
                );
              });
            }
          );
        }
      );
    });
  });
}

async function createSite() {
  await createProjectFolder();
  changeTemplate();
  createStyles();
  copyAssets();
}

createSite(); */

