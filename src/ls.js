const archy = require('archy');
const {red, yellow } = require('chalk');
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

module.exports = (onlyModel) => {
  
  if (fs.existsSync('./store')) {

    const lamp = JSON.parse(fs.readFileSync("./.lamp-lock.json", "utf8"))

    console.log(red('Models: '))

    lamp.Models.forEach(model => console.log(Object.keys(model)[0]))
    // console.log(lamp)

    if(onlyModel) return

    const currentDir = path.join(process.cwd(), './store');
  
    console.log(yellow('\nROOT: '), currentDir, '\n');

    buildTree(currentDir).forEach(tree => console.log(red(archy(tree))))
  
  } else {
  
    console.log(
      chalk.red(
        `You have not yet created the store with ${chalk.white(
          'genie generate'
        )}!`
      )
    );
  }
};
