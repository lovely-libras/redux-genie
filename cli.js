#!/usr/bin/env node

const minimist = require('minimist')
const { spawn } = require('child_process')
const currentDirectory = require('path').dirname
let input = minimist(process.argv)
let command = input._[2]
let arg1 = input._[3]

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


// this is just for development 

if(command === 'delete' && arg1 === 'all') {

	let genieDeleteCall = `node ${__dirname}/erase_dummy_store.js`

	shell(genieDeleteCall)

}
