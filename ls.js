const fs = require('fs');
const path = require('path');
const treeify = require('treeify');

const dir = path.join(__dirname, '/store');

const ls = (dir, fileList = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    fileList.push(
      fs.statSync(filePath).isDirectory() ? { [file]: ls(filePath) } : file
    );
  });
  return fileList;
};

const tree = ls(dir);
console.log(tree);
