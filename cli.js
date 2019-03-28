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

if(process.env.mode === 'testing'){
	console.log = ()=>{}
}

const shell = command => {
  let thisCommand = spawn(command, { shell: true, stdio: 'inherit' });
  return thisCommand;
};

if(command === 'generate' || command === 'gen') {

	// console.log(chalk.hex('#764fb7')('genie generate'))

	if (fs.existsSync('./.lamp-lock.json')) {
  
		console.log(chalk.yellow('\nStore has already been initialized.\nPlease use the "genie update" or "genie add" methods to alter the store.\n'))
		process.exit()
	}

	require('./generator_code_root')()
}
else if(command === 'update'){

	// console.log(chalk.hex('#764fb7')('genie update'))

	require('./updateCodeRoot')()
}
else if(command === 'add'){

	// console.log(chalk.hex('#764fb7')('genie add'))

	// let updateCommand = `add=${process.argv.slice(2)} node ${__dirname}/updateCodeRoot.js`

	// let addCall = shell(updateCommand)
	require('./updateCodeRoot')(process.argv.slice(2))
}
else if (command === 'ls' || command === 'list') {
  // console.log(chalk.hex('#764fb7')('genie ls'));

  require('./ls')()

}
else if(command === 'delete' || command === 'del') {

	shell('rm -r store .lamp-lock.json')

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

