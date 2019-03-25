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

	// refactor --->

	let crudedModelNames = newModels.filter(model => !(model.CRUD === false))

	let userDefinedActions = newModels.filter(model => model.Actions)

	let newConstants = require('./../constants_boiler')(crudedModelNames, userDefinedActions)
	
	// <---


	newConstants = "\t" + newConstants.slice(newConstants.indexOf('{') + 1, newConstants.indexOf('}')).trim()

	let fileLocation = `${process.cwd()}/store/constants/action_constants.js`

	fs.readFile(fileLocation, (err, data) => {

	    if (err) {
	        throw err;
	    }
		
		if(!data.indexOf('}')){

			console.log('Unable to complete update- genie cannot process current action constants file. Check that the file ends with a "}" bracket.')
			process.exit()
		}
	  	
	    let updatedFile = data.toString().slice(0, data.indexOf('}')) + newConstants + '\n}'

		fs.writeFile(

			fileLocation,
			
			updatedFile,

			() => {
			  console.log(chalk.yellow(`updated the action creator file to add ${modelNames.reduce((a,b)=> a + b + ' ', '')}`));
			}
		);	    
	});
}
