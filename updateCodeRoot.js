let { makeLock, diffLock } = require('./lock')
const chalk = require("chalk");
const inquirer = require('inquirer')
const update_actions_rails = require('./generator_code_files/rails_style/update/update_actions')
let rails = require("./generator_code_files/rails_style/rails_index");

// diffing is returned as an array:
// [ currentYaml, previousYaml, diff of current against previous ]
process.send('performing update call')

let diffing = diffLock()

// logic for adding a model

if(diffing[2].addedModels.length){

	let { Structure, Thunks, Logging } = diffing[1] // maintain original config answer

	// certain parts of the store can be 
	// added mechanically- they are independent
	// of the previous operations
	diffing[2].addedModels.forEach( (diff, i) => {

		process.send('We detected a Model added to lamp.config.yml: ', Object.keys(diff)[0])

		if(Structure === 'Rails'){
										// call with Update as true
			rails([ diff ], Thunks, Logging, true);
			
		}	
	})

	// to update actions- need to read 
	// the current action constants and update
	update_actions_rails()

	// to update the combine reducers, same


}












// logic for adding to an existing model


let updateActions = []
let updateThunks = []
updates = []

let deletingOnly = true

diffing[2].modelUpdates.forEach( (diff, i) => {

								// figuring out which model got
								// edited based on the index
								// we grabbed further upstream
	let modelName = Object.keys( diffing[0].Models[diff[0]] )[0]

	let operation = diff[2][0] === '+' ? 'adding' : 'deleting'

	if(operation === 'adding'){
		deletingOnly = false
	}

	let added = typeof diff[2][1] === 'string' ? diff[2][1] : Object.keys(diff[2][1]) ; 

	process.send(chalk.yellow(`You updated the model ${modelName} by ${operation} ${diff[1]}: ${ added } `))
	
	if(operation === 'deleting'){
	
		process.send(chalk.red('FYI- we will never delete anything based on a genie update call.'))
	}
	else if(operation === 'adding'){
		
		// need to separate these out based on whether
		// they're actions or thunks

		updates.push(`\n${operation} ${diff[1]}: ${ added } to model ${modelName}\n`)
	}	
})



if(updates.length && !deletingOnly){

	var questions = [{
		  type: 'input',
		  name: 'answer',
		  message: `Please confirm that all files are saved.\nPlease confirm that we can proceed with the following updates: ${updates.join('')}\n\n "Yes" or "No"`,
		}]

	inquirer.prompt(questions).then( result => {

		const { answer } = result

		if(answer === "Yes" || answer === "yes"){

		  process.send(`Confirmed`)

		  // initialize add operations
		  update_actions(updates)

		}
		else{
			process.send('Updates not confirmed, exiting process.')
			process.exit()
		}

	})
}
else if(updates.length && deletingOnly){

	process.send(chalk.red('\nOnly delete operations detected, exiting process'))

	// call yam validation to reverse their deletions

}
else{
	setTimeout(()=>{

		process.send(chalk.red("No updates to current models detected in lamp.config.yml"))
	}, 1000)
	
}



// makeLock(diffing[0], diffing[1])
