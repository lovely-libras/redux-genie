// these are the methods to interact with the .lamp.lock.json file
const fs = require("fs");
const yaml = require("js-yaml");
const { diff } = require('json-diff')

const makeLock = (currentYam, previousYam, diffedModels, diffedAdditions) => {

	if(!previousYam){

		fs.writeFile(
		    "./.lamp-lock.json",
		    JSON.stringify(currentYam, null, "\t"),
		    () => {
		    }
		);
	}
	else{

		// we don't want any deletions written to the next lamp lock
		// so we're going to merge the additions into the previous
		// version of each model, so the next models only contain
		// the user's additions

		diffedAdditions.forEach((model, modelIndex) => {

			model.forEach( diff => {

				const previousModel = previousYam.Models[modelIndex]
				const diffType = diff[1]
				const newEntry = diff[2][1]

				if(previousModel[diffType]){
					previousModel[diffType].push(newEntry)
				}
				else if(!previousModel[diffType]){
					previousModel[diffType] = []
					previousModel[diffType].push(newEntry)
				}
			})
		})
		
		let combinedModels = [...previousYam.Models, ...diffedModels]

		let nextLock = {

			// so they can't change the structure choice
			// this would make it impossible to resolve the 
			// file locations after the fact
			Structure: previousYam.Structure,
			Models: combinedModels 
		} 

		// same for this
		previousYam.Thunks ? nextLock.Thunks = 'included' : '' ;

		fs.writeFile(
		    "./.lamp-lock.json",
		    JSON.stringify(nextLock, null, "\t"),
		    () => {
		    }
		);
	}
}

const diffLock = (definedCurrent) => {

	let currentYam
	let previousYam = returnPrevious()

	// during an add call, we define this variable by the CLI input
	if(definedCurrent){

		currentYam = definedCurrent
	}
	else{ // during an update call, its read from the yml

		try {

		  currentYam = yaml.safeLoad(fs.readFileSync("./lamp.config.yml", "utf8"));
		  currentYam = JSON.parse(JSON.stringify(currentYam, null, '\t'))
		} catch (e) {
		  console.log(e.message);
		  process.exit();
		}
	
	}
	
	const diffify = (current, previous) => {

		// check if the user added any models
		
		let lastYaml = {}

		previous.Models.forEach(model => lastYaml[Object.entries(model)[0]] = true)

		let addedModels = current.Models.filter(model => !lastYaml[Object.entries(model)[0]])

		// traverse the current models to see if the user
		// added or changed any properties

		let modelUpdates = []

		current.Models.forEach( (model, modelIndex) =>{
			
			if( lastYaml[Object.entries(model)[0]] ){ // not a completely new Model
					
				for(let part in model){

					let storeParts = part === 'Thunks' || part === "Slice" || part === "Actions"

					// if the user didn't previously define a part in the yaml
					
					if(!previous.Models[modelIndex][part] && storeParts && model[part]){

						model[part].forEach( newEntry => {

							modelUpdates.push( [ modelIndex, part, [ '+' , newEntry ] ]  )

						})

					}
					else{

						// else, lets see if they added anything to each part

						let thisDiff = diff( previous.Models[modelIndex][part], model[part] )

						if(thisDiff && !(part === 'CRUD')){

							if(!thisDiff.filter){
								console.log('Please added some property to: ', part)
								process.exit()
							}

							thisDiff = thisDiff.filter((diff) => diff[0] === "+" || diff[0] === '-')

							thisDiff.forEach(diff => {

												// this means the diffed updates
												// will always have the same
												// index in their array
												// as the previous model array they
												// came from 
								modelUpdates.push( [ modelIndex, part, diff ] )
							})
						}
					}
				}
			}
		})

		return { addedModels, modelUpdates:  modelUpdates  }
	}

	return [currentYam, previousYam, diffify(currentYam, previousYam)]
}

const returnPrevious = () => {

	try {

		return JSON.parse(fs.readFileSync("./.lamp-lock.json", "utf8"))

	} catch (e) {
	  console.log(e.message);
	  process.exit();
	}

}

module.exports = {
	makeLock,
	diffLock,
	returnPrevious
}