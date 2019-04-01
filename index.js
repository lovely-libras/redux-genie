const chalk = require('chalk');
const minimist = require('minimist');

const command = require('./src');

const args = minimist(process.argv.slice(2));
const cmd = args._[0];

module.exports = () => {
  switch (cmd) {
    case 'help':
    case 'h':
      command.help.help();
      break;
    case 'sample':
    case 's':
      require('./src/sample');
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
