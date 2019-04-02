// const chalk = require('chalk');
const minimist = require('minimist');

const { help, sample, list } = require('./src');

const args = minimist(process.argv.slice(2));
const cmd = args._[0];

// Need to refactor switch in to if statements again (getting too big). Want to create them outside the module.exports. Currently only help is set up to work. Need alternative to default case's error handling.

module.exports = () => {
  if (cmd === 'help' || cmd === 'h') {
    help.sendHelp();
  }
  if (cmd === 'sample' || cmd === 's') {
    sample.getSample();
  }
  if (cmd === 'list' || cmd === 'ls') {
    list.renderList();
  }
  // switch (cmd) {
  //   case 'help':
  //   case 'h':
  //     help.sendHelp(); // Rename function
  //     break;
  //   case 'sample':
  //   case 's':
  //     sample.getSample();
  //     break;
  //   case 'list':
  //   case 'ls':
  //     list.renderList();
  //     break;
  //   default:
  //     console.error(`${chalk.red(`'${cmd}' is not a valid command!`)}`);
  //     break;
  // }
};
