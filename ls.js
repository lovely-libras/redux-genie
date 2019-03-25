const fs = require('fs');
const path = require('path');
const archy = require('archy');

const dir = path.join(__dirname, '/store');

const ls = (dir, fileList = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    fileList.push(
      fs.statSync(filePath).isDirectory()
        ? { label: file, nodes: ls(filePath) }
        : file
    );
  });
  return fileList;
};

// { [file]: ls(filePath) } : file

// const ls = (dir, fileList = []) => {
//   fs.readdirSync(dir).forEach(file => {
//     const filePath = path.join(dir, file);
//     fileList.push(
//       fs.statSync(filePath).isDirectory() ? { [file]: ls(filePath) } : file
//     );
//   });
//   return fileList;
// };

// function tree (name) {
//  this.label = ''
//  this.node = []
// }

const tree = ls(dir);
console.log('Tree: ', tree);

const printFileStructure = tree => {
  for (let i = 0; i < tree.length; i++) {
    console.log(archy(tree[i]));
  }
};

printFileStructure(tree);
