const path = require('path');
// const {readdir } = require('fs/promises');
const fs = require('fs');

const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, styles) => {
  if (err) throw err;
  for (let style of styles) {
    const stylePath = path.join(path.join(__dirname, 'styles'), style.name);

    const input = fs.createReadStream(stylePath, 'utf-8');
    if (style.isFile() && path.extname(style.name) === '.css') {
      input.pipe(output);
    }
  }
});



  
/* const fs = require('fs');
const path = require('path');

let bundle = path.join(__dirname, 'project-dist', 'bundle.css');

fs.access(bundle, fs.F_OK, (err) => {
  if (err) {
    fs.readdir(path.join(__dirname, 'styles'), function(err, items) {

      for (let i = 0; i < items.length; i++) {
    
        if(path.extname(items[i]).trim() === '.css') {
          
          fs.stat(path.join(__dirname, `styles/${items[i]}`), function(err, stats) {
            if(stats.isFile()) {
              
              const readedeblStream = fs.createReadStream(path.join(`${__dirname}/styles`, items[i]));
              let data = '';
              let dataArray = [];
              readedeblStream.on('data', chunk => data += chunk);
              readedeblStream.on('end', () => {
                dataArray.push(data);
                for (let i = 0; i < dataArray.length; i++) {
    
                  fs.appendFile(
                    path.join(`${__dirname}/project-dist`, 'bundle.css'),
                    `${dataArray[i]}\n`,
                    err => {
                      if (err) throw err;
                    }
                  );
                }
              });
              readedeblStream.on('error', error => console.log('Error', error.message));
    
            }
      
          });
        }
        
      }
    });
  } else {
    fs.unlink(path.join(__dirname, 'project-dist', 'bundle.css'), err => {
      if (err) throw err;
    });
    fs.readdir(path.join(__dirname, 'styles'), function(err, items) {
  
      for (let i = 0; i < items.length; i++) {
    
        if(path.extname(items[i]).trim() === '.css') {
          
          fs.stat(path.join(__dirname, `styles/${items[i]}`), function(err, stats) {
            if(stats.isFile()) {
              
              const readedeblStream = fs.createReadStream(path.join(`${__dirname}/styles`, items[i]));
              let data = '';
              let dataArray = [];
              readedeblStream.on('data', chunk => data += chunk);
              readedeblStream.on('end', () => {
                dataArray.push(data);
                for (let i = 0; i < dataArray.length; i++) {
    
                  fs.appendFile(
                    path.join(`${__dirname}/project-dist`, 'bundle.css'),
                    `${dataArray[i]}\n`,
                    err => {
                      if (err) throw err;
                    }
                  );
                }
              });
              readedeblStream.on('error', error => console.log('Error', error.message));
    
            }
      
          });
        }
        
      }
    });
  }
}); */

/* const fs = require("fs");
const path = require("path");
const pathStyles = path.join(__dirname, "styles");
const pathTo = path.join(__dirname, "project-dist", "bundle.css");

const handleError = (err) => {
  if (err) {
    console.log(err);
    throw new Error("error");
  }
};
const output = fs.createWriteStream(pathTo);

fs.readdir(pathStyles, { withFileTypes: true }, (err, files) => {
  handleError(err);

  files.forEach((file) => {
    const pathFrom = path.join(pathStyles, file.name);
    if (file.isFile() && path.extname(pathFrom) === ".css") {
      const input = fs.createReadStream(pathFrom);
      input.pipe(output);
    }
  });
}); */

/* const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (error, data) => {
    if (error) console.error(error.message);
    fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (error) => {
        if (error) console.error(error.message);
    });
    data.forEach(file => {
        if (file.isFile()) {
            if (path.extname(file.name) === '.css') {
                fs.readFile(path.join(__dirname, 'styles', file.name), 'utf-8', (error, data) => {
                    if (error) console.error(error.message);
                    fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, (error) => {
                       if (error) console.error(error.message);
                    })
                });
            }
        }
    })
}) */

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

/* const fs = require('fs');
const path = require('path');

const style = path.resolve(__dirname, 'styles');
const projectDist = path.resolve(__dirname, 'project-dist');
const bundle = fs.createWriteStream(path.resolve(projectDist, 'bundle.css'));

fs.readdir(style, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if(path.extname(file) === '.css') {
      const read = fs.createReadStream(path.resolve(style, file));
      read.on('data', (data) => {
        bundle.write(data + '\n');
      });
    }
  });
}); */