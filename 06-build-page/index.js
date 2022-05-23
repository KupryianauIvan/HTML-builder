const fs = require('fs');
const path = require('path');
const { mkdir, rm, readFile, copyFile, writeFile, readdir } = require('fs/promises');
//!Pathe's
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
