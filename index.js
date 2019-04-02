const chalk = require('chalk');
const minimist = require('minimist');

const { help, sample } = require('./src');

const args = minimist(process.argv.slice(2));
const cmd = args._[0];

// Need to refactor switch in to if statements again (getting too big). Want to create them outside the module.exports. Currently only help is set up to work. Need alternative to default case's error handling.

module.exports = () => {
  switch (cmd) {
    case 'help':
    case 'h':
      help.help(); // Rename function
      break;
    case 'sample':
    case 's':
      sample.getSample();
      break;
    case 'generate':
    case 'gen':
    case 'g':
      require('./generator_code_root');
      break;
    case 'delete':
    case 'del':
    case 'd':
      require('./src/delete');
      break;
    default:
      console.error(
        `${chalk.white(`\'${cmd}\' ${chalk.red(`is not a valid command!`)}`)}`
      );
      break;
  }
};
