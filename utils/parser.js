const fs = require('fs');
const path = require('path');

function readFile(file) {
  return fs.readFileSync(path.join(__dirname, `../${file}`), 'utf8');
}

module.exports = {
  readFile,
};
