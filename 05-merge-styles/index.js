const path = require('path');
// const {readdir } = require('fs/promises');
const fs = require('fs');

const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'test-files/styles'), { withFileTypes: true }, (err, styles) => {
  if (err) throw err;
  for (let style of styles) {
    const stylePath = path.join(path.join(__dirname, 'test-files/styles'), style.name);

    const input = fs.createReadStream(stylePath, 'utf-8');
    if (style.isFile() && path.extname(style.name) === '.css') {
      input.pipe(output);
    }
  }
});

/* (async function () {
  try {
    const files = await readdir(path.join(__dirname, 'styles'), {
      withFileTypes: true,
    });
    let bundleStyles = [];
    
    files.forEach((item) => {
      if (item.isFile() && path.extname(item.name) === '.css') {
        fs.readFile(path.join(__dirname, 'styles', item.name), (err, data) => {
          if (err) throw err;
          bundleStyles.push(data.toString());

          fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), bundleStyles.map(item =>  {
            return item.join(', ');
          }).join('\n'), err => {
            if (err) throw err;
          });
        });
        }});
  } catch (err) {
    console.error(err);
  }
})(path.join(__dirname, 'styles'));  */