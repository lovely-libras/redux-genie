let { makeLock, diffLock } = require('./lock')
const { spawn } = require('child_process')
const chalk = require("chalk");
const inquirer = require('inquirer')
const update_combiner = require('./../generator_code_files/rails_style/update/update_combine_reducer')
const minimist = require('minimist')
console.deep = (input) => {
	console.log(require('util').inspect(input, { showHidden: true, depth: null }))
}
if(process.env.mode === 'testing'){
	console.log = ()=>{}
}
// diffing is returned as an array:
// [ currentYaml, previousYaml, diff of current against previous ]

let diffing 

// this is an update call
if(!process.env.add){

	diffing = diffLock()
}
else if (process.env.add){

	// this is an add call

	diffing = require('./addCodeRoot')(process.env.add.split(','))
}

// logic for adding a model

let { Structure, Thunks, Logging } = diffing[1] // maintain original config answer

if(diffing[2].addedModels.length){
	
	let modelNames = diffing[2].addedModels.map(model => Object.keys(model)[0])

	if(Structure === 'Rails'){

		diffing[2].addedModels.forEach( (diff) => {

			console.log(chalk.red('We detected a Model added to lamp.config.yml: ', Object.keys(diff)[0]))
											// call with Update as true
			require("./../generator_code_files/rails_style/rails_index")([ diff ], Thunks, Logging, true);
		})
	
		// to update actions- need to read 
		// the current action constants and update
		require('./../generator_code_files/rails_style/update/update_actions')(modelNames, diffing[2].addedModels, Thunks)

		// to update the combine reducers, same
		update_combiner(modelNames, 'Rails')
	}

	else if(Structure === 'Ducks'){

		diffing[2].addedModels.forEach((diff) => {

			let modelName = Object.keys(diff)[0][0]
			                              .toUpperCase()
			                                 .concat(Object.keys(diff)[0].slice(1))

			console.log(chalk.red('We detected a Model added to lamp.config.yml: ', modelName ))

			let makeDir = spawn(`mkdir store/${modelName}`, { shell: true });

			makeDir.on("exit", () => {

			  require('./../generator_code_files/ducks_style/index')(diff, modelName, Thunks);
			});
    	});

		update_combiner(modelNames, 'Ducks')
	}
}



// logic for adding to an existing model

const updatesArr = []

if(diffing[2].modelUpdates.length){

	let deletingOnly = true


	diffing[2].modelUpdates.forEach( (diff) => {

									// figuring out which model got
									// edited based on the index
									// we grabbed further upstream

		let modelName = Object.keys( diffing[0].Models[diff[0]] )[0]

		let index = diff[0]

		diff[0] = modelName[0].toUpperCase().concat(modelName.slice(1))

		let operation = diff[2][0] === '+' ? 'adding' : 'deleting'

		if(operation === 'adding'){

			deletingOnly = false
		}

		let added = typeof diff[2][1] === 'string' ? diff[2][1] : Object.keys(diff[2][1]) ; 

		console.log(chalk.yellow(`You updated the model ${modelName} by ${operation} ${diff[1]}: ${ added } `))
		
		if(operation === 'deleting'){
		
			console.log(chalk.red('FYI- we will never delete anything based on a genie update call.'))
		}
		else if(operation === 'adding'){
			
			if(!updatesArr[index]){
				updatesArr[index] = []
			}

			updatesArr[index].push(diff)

			// updatesArr.push(`\n${operation} ${diff[1]}: ${ added } to model ${modelName}\n`)
		}	
	
	})

	if(updatesArr.length && !deletingOnly){

		if(Structure === 'Rails'){

			require('./../generator_code_files/rails_style/update/edit_model')(updatesArr, Thunks)
		}

		if(Structure === 'Ducks'){

			require('./../generator_code_files/ducks_style/edit_model')(updatesArr, Thunks)
		}
	}
	else if(updatesArr.length && deletingOnly){

		console.log(chalk.red('\nOnly delete operations detected, exiting process'))
	}
	else{
		setTimeout(()=>{

			console.log(chalk.red("No updates to current models detected in lamp.config.yml"))
		}, 1000)
		
	}
}

makeLock(null, diffing[1], diffing[2].addedModels, updatesArr)

/*

this is a prompt thing to put in after testing phase

var questions = [{
	  type: 'input',
	  name: 'answer',
	  message: `Please confirm that all files are saved.\nPlease confirm that we can proceed with the following updates: ${updates.join('')}\n\n "Yes" or "No"`,
	}]

inquirer.prompt(questions).then( result => {

	const { answer } = result

	if(answer === "Yes" || answer === "yes"){

	  console.log(`Confirmed`)

	  initialize add operations

	}
	else{
		console.log('Updates not confirmed, exiting process.')
		process.exit()
	}

})		

*/