#!/usr/bin/env node

const minimist = require('minimist');
const { spawn } = require('child_process');
let input = minimist(process.argv);
let command = input._[2];
let arg1 = input._[3];

if (process.env.mode === 'testing') {
  console.log = () => {};
}

const shell = command => {
  spawn(command, { shell: true, stdio: 'inherit' });
};

if(command === 'generate' || command === 'gen') {

	console.log(chalk.hex('#764fb7')('genie generate'))

	// if theres a lamp config

	let gencommand = `node ${__dirname}/generator_code_root.js`

	let generateCall = shell(gencommand)

}
else if(command === 'update'){

	console.log(chalk.hex('#764fb7')('genie update'))

	let updateCommand = `node ${__dirname}/updateCodeRoot.js`

	let updateCall = shell(updateCommand)
	
}
else if(command === 'add'){

	console.log(chalk.hex('#764fb7')('genie add'))

	let updateCommand = `add=${process.argv.slice(2)} node ${__dirname}/updateCodeRoot.js`

	let addCall = shell(updateCommand)
}
else if (command === 'ls' || command === 'list') {
  console.log(chalk.hex('#764fb7')('genie ls'));

  let lsCommand = `node ${__dirname}/ls.js`;

  let lsCall = shell(lsCommand);

}
else if(command === 'delete' || command === 'del') {

	let genieDeleteCall = `node ${__dirname}/erase_dummy_store.js`

if (command === 'update' || command === 'u') {
  let update = `node ${__dirname}/updateCodeRoot.js`;
  shell(update);
}

if (command === 'add' || command === 'a') {
  let add = `add=${process.argv.slice(2)} node ${__dirname}/updateCodeRoot.js`;
  shell(add);
}
else if (command === 'simdev') {

  if (arg1 === 'last') {
    simulation_dev[simulation_dev.length - 1]();
  } else if (typeof arg1 === 'number') {
    simulation_dev[Number(arg1)]();
  }
}
else if (command === 'sim') {

    require('./simulationstwo')[Number(arg1)]();
}
else{

	console.log(chalk.red('the genie says: command not found'))

}

