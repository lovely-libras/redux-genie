#!/usr/bin/env node

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

// const shell = (command) => {

// 	let thisCommand	= spawn(command, {shell: true, 
// 						stdio: [ 'pipe', 'pipe', 'pipe', 'ipc' ]
// 								}
// 						)

// 	return thisCommand
// }

const shell = (command) => {

	let thisCommand	= spawn(command, {shell: true, 
						stdio: 'inherit'
								}
						)

	return thisCommand
}


if(command === 'generate') {
		
	let gencommand = `node ${__dirname}/generator_code_root.js`

	let generateCall = shell(gencommand)

	generateCall.on('message', (message) =>{
		
		if(process.send){
		
			process.send(chalk.yellow(message))
		}
		else{

			console.log(chalk.yellow(message))
		}

	})

	generateCall.on('error', (error)=>{
	
		console.log(error)
	})	
}

if(command === 'update'){

	let updateCommand = `node ${__dirname}/updateCodeRoot.js`

	let updateCall = shell(updateCommand)

	updateCall.on('message', (message) =>{
		
		if(process.send){
		
			process.send(chalk.yellow(message))
		}
		else{

			console.log(chalk.yellow(message))
		}

	})
}

// these will only be for development 

if(command === 'delete' && arg1 === 'all') {

	let genieDeleteCall = `node ${__dirname}/erase_dummy_store.js`

	shell(genieDeleteCall)

}

if(command === 'sim'){

	if(arg1 === 'last'){

		simulation[simulation.length-1]()
	}
	else if(typeof arg1 === 'number'){
		
		simulation[ Number(arg1) ]()
	}
}

if(command === 'simdev'){

	if(arg1 === 'last'){

		simulation_dev[simulation_dev.length-1]()
	}
	else if(typeof arg1 === 'number'){
		
		simulation_dev[ Number(arg1) ]()
	}
}

