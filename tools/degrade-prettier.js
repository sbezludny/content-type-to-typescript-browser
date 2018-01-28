var fs = require('fs');
var path = require('path');

var oldPath = path.join(__dirname, 'prettier-bundle.js');
var newPath = path.join(__dirname, '../node_modules/prettier/index.js');

fs.createReadStream(oldPath).pipe(fs.createWriteStream(newPath));
console.log('A bundled version of prettier was copied.');
