#!/usr/bin/env node

const minimist = require('minimist')
const { spawn } = require('child_process')
const currentDirectory = require('path').dirname
let input = minimist(process.argv)
let command = input._[2]
let arg1 = input._[3]
const { makeLock, diffLock } = require('./lock')
const simulation = require('./test_simulation')

const shell = (command) => {

	spawn(command, {shell: true, 
					stdio: 'inherit' 
				}
		)
}

if(command === 'generate') {
		
	let generateCall = `node ${__dirname}/generator_code_root.js`

	shell(generateCall)	
}

if(command === 'update'){

	let updateCall = `node ${__dirname}/updateCodeRoot.js`

	shell(updateCall)
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
	else{
		

		simulation[ Number(arg1) ]()
		
	}
}

