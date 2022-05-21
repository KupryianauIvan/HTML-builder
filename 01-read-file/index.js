/* import { fs } from ('fs');
import { path } from ('path'); */

const fs = require('fs');
const path = require('path');
let data = '';
const readableStream = fs.createReadStream(
  path.join(__dirname, 'text.txt'), (err) => {
    if (err) throw err;
  }, 'utf-8');

readableStream.on('data', chunk => data += chunk);
readableStream.on('data', () => console.log( data ));

