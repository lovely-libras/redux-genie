#!/usr/bin/env node

const minimist = require('minimist')
const { spawn } = require('child_process')
let input = minimist(process.argv)
let command = input._[2]
let arg1 = input._[3]

// console.log(input)

/* note - 

right now this only works if you are inside the 
actual directory- need to configure directory defining somehow 

something like a "cwd" in the .lampack.json

*/

const shell = (command) => {

	spawn(command, {shell: true, 
					cwd: process.cwd(), 
					stdio: 'inherit' }
		)
}

if(command === 'delete' && arg1 === 'all') {

	shell('node erase_dummy_store.js')
}

if(command === 'generate' && arg1 === 'store') {

	shell('node generator_code_root.js')

	/*
	
	todo: add variable to .lamp.json to 
	prevent calling and writing over existing store 
	structure

	store = true

	logic- 
	if there's already a store folder
	if there's not a .lamp.json file- did someone accidentally erased it?
	
	point being- we don't ever want someone to accidentally call
	this and then write over their existing store

	*/
}

if(command === 'cwd'){

	console.log(process.cwd())

}

if(command === 'list'){

}

/*

loading states- isFetching?



*/


