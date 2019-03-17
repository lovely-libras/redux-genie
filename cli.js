#!/usr/bin/env node

const minimist = require('minimist')
const { spawn } = require('child_process')
let input = minimist(process.argv)
let command = input._[2]

const shell = (command) => {

	spawn(command, {shell: true, 
					cwd: process.cwd(), 
					stdio: 'inherit' }
		)
}

if(command === 'erase') {

	shell('node erase_dummy_store.js')
}

if(command === 'generate') {

	shell('node generator_code_root.js')
}

if(command === 'add'){


}

if(command === 'list'){

}