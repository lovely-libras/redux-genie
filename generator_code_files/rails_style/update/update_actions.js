// this file updates the action constants for an existing store
// for the Rails model
const fs = require("fs");
const chalk = require('chalk')

module.exports = async (modelNames, newModels, Thunks)=> {

	// Models is an array of objects representing the new models
	// list on the updated yaml
	// thunks is the separation option chosen in the initial yaml

	/* 
		First I want to read the originalFile-
		we should update the file based on its
		current state rather than the yaml,
		in case the user updates it manually without
		using the genie
	*/

	modelNames = modelNames.reduce((a,b)=> a + b, '')

	// this is repeated code that is low hanging fruit for refactoring --->

	let crudedModelNames = newModels.filter(model => !(model.CRUD === false))

	let userDefinedActions = newModels.filter(model => model.Actions)

	let newConstants = require('./../constants_boiler')(crudedModelNames, userDefinedActions)
	
	// <---

	if(!newConstants.indexOf('}')){

		console.log('unable to complete update- genie cannot process current action constants file')
		process.exit()
	}

	newConstants = "\t" + newConstants.slice(newConstants.indexOf('{') + 1, newConstants.indexOf('}')).trim()

	let fileLocation = `${process.cwd()}/store/constants/action_constants.js`

	fs.readFile(fileLocation, (err, data) => {

	    if (err) {
	        throw err;
	    }
	  	
	    let updatedFile = data.toString().slice(0, data.indexOf('}')) + newConstants + '\n}'

		fs.writeFile(

			fileLocation,
			
			updatedFile,

			() => {
			  console.log(chalk.yellow(`updated the action creator file to add ${modelNames}`));
			}
		);	    
	});
}
