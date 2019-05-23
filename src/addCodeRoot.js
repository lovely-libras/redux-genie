const chalk = require('chalk')

module.exports = (commandLine) => {

	/*
		strategy:
		convert the input into a Model, feed that model in to the 
		diffing function as the current model, then 
		run update with the result of that function call

		otherwise, someone might call add with the
		same input a bunch of times and there'd
		be no way to stop it
	
		for add model- takes current yaml and simply appends new model

		for add action/ add thunk - takes current yaml, traverses to find
		the specific model, then appends to existing
	*/

	const addCall = require('minimist')(commandLine)

	// extract and validate command input

	const existingModel = addCall.model || addCall.Model || addCall.m || addCall.MODEL
	const newModel = addCall.newModel || addCall.newmodel || addCall.M || addCall.NEWMODEL

	if(Array.isArray(existingModel)){

		console.error(require('chalk').yellow('ERROR: can only edit one model at a time. Please run consecutive calls for', existingModel.join(' and ')))
		process.exit()
	} 
	if(Array.isArray(newModel)){
		console.error(require('chalk').yellow('ERROR: can only add one model at a time via genie add. Please run consecutive calls for', newModel.join(' and '), ', or use the genie update method.'))
		process.exit()
	}

	if(!existingModel && !newModel) {
		
		console.log(chalk.yellow('No exisiting Model found- please defined model with "--model" or "-m." To add a new model, use --newModel or -M.'))
		process.exit()
	}

	let definedThunks = addCall.thunks || addCall.Thunks || addCall.t
	let definedActions = addCall.actions || addCall.Actions || addCall.a
	const noCrud = addCall.nocrud || addCall.noCrud || addCall.noCRUD || addCall.NOCRUD

	// this is processed with command line input
	// to the update code root as the new "current" yam
	
	let newCurrent = require('./lock').returnPrevious()
	
	// new model call
	if(newModel){

		newCurrent.Models.forEach(model => {

			const oldModelName = Object.keys(model)[0]

			const capitalizedOldModelName = oldModelName[0].toUpperCase().concat(oldModelName.slice(1))
			
			if( oldModelName === newModel || oldModelName.toUpperCase() === newModel ||capitalizedOldModelName === newModel ){

				console.error(require('chalk').yellow('ERROR: Model', newModel, 'already defined'))
				process.exit()
			}
		})

		const modelObject = { [newModel] : null,
							  Slice: [ { State: 'string'}],
							  Actions: [  ],
							  Thunks: [ ]
							}

		if(noCrud){
			modelObject.CRUD = false
		}
		
		if(definedThunks){

			Array.isArray(definedThunks) ? modelObject.Thunks.push(...definedThunks.map(thunk => { return { [thunk] : ['blank', 'blank']} } )) : modelObject.Thunks.push({ [definedThunks] : ['blank', 'blank'] }  ) ;
		}

		if(definedActions){

			Array.isArray(definedActions) ? modelObject.Actions.push(...definedActions) : modelObject.Actions.push(definedActions) ;
		}

		newCurrent.Models.push(modelObject)

	}

	// add to model call

	if(existingModel){

		if(!definedThunks && !definedActions){
			console.log(chalk.yellow('Please define an action or thunk to add to an existing model'))
			process.exit()
		}

		// find the model they want to update
		// have to search for both the previous model and previous model capitalized

		let thisModel 

		newCurrent.Models.forEach(model => {

			const currentModelName = Object.keys(model)[0]
			const capitalizedModelName = currentModelName[0].toUpperCase().concat(currentModelName.slice(1))
			
			if( currentModelName === existingModel || capitalizedModelName === existingModel ){

				thisModel = model
			}

		})

		if(definedThunks){

			// filter for Thunks that already exist on the model, then push to the model list

			let currentThunks 

			if(thisModel.Thunks){

				currentThunks = thisModel.Thunks.reduce((a,b) => { a.push(...Object.keys(b)); return a } , [])
			} 
			else{
				thisModel.Thunks = []
				currentThunks = thisModel.Thunks
			}

			if(Array.isArray(definedThunks)){

				// have to convert the current model thunks to an array of just each thunk's names
				definedThunks = definedThunks.filter(thunk =>  !currentThunks.includes(thunk) )
				definedThunks = definedThunks.map(thunk => { return { [thunk] : ['blank', 'blank']} } )
				thisModel.Thunks.push(...definedThunks)

			}
			else{

				definedThunks = { [definedThunks] : ['null', 'null']}
				
				if(!currentThunks.includes(Object.keys(definedThunks)[0])){
					thisModel.Thunks.push(definedThunks)
				}
				else{ 

					console.log('Thunk', Object.keys(definedThunks)[0], 'is already defined on', Object.keys(thisModel)[0])
				} 
			}
		}

		if(definedActions){

			const modelName = Object.keys(thisModel)[0]

			// edge case where they try and add a CRUD method

			let cruds = ['getCampus', 'getAllCampus', 'createCampus', 'updateCampus', 'deleteCampus']

			// filter for Thunks that already exist on the model, then push to the model list
	
			if(Array.isArray(definedActions)){

				// have to convert the current model thunks to an array of just each thunk's names
				definedActions = definedActions.filter(thunk =>  !thisModel.Actions.includes(thunk) )

				if(definedActions.length) thisModel.Actions.push(...definedActions)

			}
			else if (!thisModel.Actions){
				thisModel.Actions = []
				thisModel.Actions.push(definedActions)
			}
			else{

				!thisModel.Actions.includes(definedActions) ? thisModel.Actions.push(definedActions) : console.log('Action ', definedActions, 'is already defined on', Object.keys(thisModel)[0])
			}
		}


	}

	return require('./lock').diffLock(newCurrent)
}
