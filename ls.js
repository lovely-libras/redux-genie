const archy = require('archy');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const buildTree = (dir, fileList = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    fileList.push(
      fs.statSync(filePath).isDirectory()
        ? { label: file, nodes: buildTree(filePath) }
        : file
    );
  });
  return fileList;
};

const printFileStructure = tree => {
  for (let i = 0; i < tree.length; i++) {
    console.log(archy(tree[i]));
  }
};

module.exports = {
  ls: function() {
    if (fs.existsSync('./store')) {
      const tree = buildTree(path.join(process.cwd(), './store'));
      printFileStructure(tree);
    } else {
      console.log(
        chalk.red(
          `You have not yet created the store with ${chalk.white(
            'genie generate'
          )}!`
        )
      );
    }
  },
};
