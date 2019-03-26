#!/usr/bin/env node

<<<<<<< HEAD
const fs = require('fs')
const chalkAnimation = require('chalk-animation');
const minimist = require('minimist')
const chalk = require('chalk')
const { spawn } = require('child_process')
const currentDirectory = require('path').dirname
let input = minimist(process.argv)
let command = input._[2]
let arg1 = input._[3]
const { makeLock, diffLock } = require('./lock')
const simulation = require('./test_simulation')
const simulation_dev = require('./test_simulation.dev')

if(process.env.mode === 'testing'){
	console.log = ()=>{}
=======
const minimist = require('minimist');
const chalk = require('chalk');
const { spawn } = require('child_process');
const currentDirectory = require('path').dirname;
let input = minimist(process.argv);
let command = input._[2];
let arg1 = input._[3];
const { makeLock, diffLock } = require('./lock');
const simulation = require('./test_simulation');
const simulation_dev = require('./test_simulation.dev');

if (process.env.mode === 'testing') {
  console.log = () => {};
>>>>>>> master
}

const shell = command => {
  let thisCommand = spawn(command, { shell: true, stdio: 'inherit' });
  return thisCommand;
};

if (command === 'generate') {
  console.log(chalk.red('genie generate'));
  let gencommand = `node ${__dirname}/generator_code_root.js`;
  let generateCall = shell(gencommand);
}

<<<<<<< HEAD
if(command === 'generate' || command === 'gen') {

	console.log(chalk.red('genie generate'))

	let gencommand = `node ${__dirname}/generator_code_root.js`

	let generateCall = shell(gencommand)

=======
if (command === 'update') {
  console.log(chalk.red('genie update'));
  let updateCommand = `node ${__dirname}/updateCodeRoot.js`;
  let updateCall = shell(updateCommand);
>>>>>>> master
}

if (command === 'ls') {
  console.log(chalk.red('genie ls'));
  let lsCommand = `node ${__dirname}/ls.js`;
  let lsCall = shell(lsCommand);
}

<<<<<<< HEAD
// these will only be for development 

if(command === 'delete' || command === 'del') {

	let genieDeleteCall = `node ${__dirname}/erase_dummy_store.js`

	shell(genieDeleteCall)
=======
// these will only be for development
>>>>>>> master

if (command === 'delete' && arg1 === 'all') {
  let genieDeleteCall = `node ${__dirname}/erase_dummy_store.js`;
  shell(genieDeleteCall);
}

if (command === 'sim') {
  if (arg1 === 'last') {
    simulation[simulation.length - 1]();
  } else if (typeof arg1 === 'number') {
    simulation[Number(arg1)]();
  }
}

if (command === 'simdev') {
  if (arg1 === 'last') {
    simulation_dev[simulation_dev.length - 1]();
  } else if (typeof arg1 === 'number') {
    simulation_dev[Number(arg1)]();
  }
}
<<<<<<< HEAD


if(command === 'print'){

	const key = Object.keys(require('./test/config.dev'))[arg1]

	fs.writeFile(
      "./lamp.config.yml",
      require('./test/config.dev')[key](),
      () => {}
    )

}

=======
>>>>>>> master
