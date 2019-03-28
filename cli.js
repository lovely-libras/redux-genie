#!/usr/bin/env node

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
const simulation_dev = require('./test/old/generate_tests/test_simulation.dev')

if(process.env.mode === 'testing'){
	console.log = ()=>{}
}

const shell = command => {
  let thisCommand = spawn(command, { shell: true, stdio: 'inherit' });
  return thisCommand;
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

	shell(genieDeleteCall)

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

