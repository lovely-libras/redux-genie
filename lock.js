// these are the methods to interact with the .lamp.lock.json file
const fs = require("fs");
const yaml = require("js-yaml");
const { diff } = require('json-diff')

const makeLock = (current, previous) => {

	if(!previous){

		fs.writeFile(
		    "./.lamp-lock.json",
		    JSON.stringify(current, null, "\t"),
		    () => {
		    }
		);
	}
	else{

		// so they can't change the structure choice
		// this would make it impossible to resolve the 
		// file locations after the fact
	
		let nextLock = {

			Structure: previous.Structure,
			Models: current.Models 
		
		} 

		previous.Thunks ? nextLock.Thunks = 'included' : '' ;

		console.log(nextLock)

		// fs.writeFile(
		//     "./.lamp-lock.json",
		//     JSON.stringify(nextLock, null, "\t"),
		//     () => {
		//     }
		// );
	}
}

const diffLock = () => {

	let currentYam
	let previousYam 

	try {

	  currentYam = yaml.safeLoad(fs.readFileSync("./lamp.config.yml", "utf8"));
	  currentYam = JSON.parse(JSON.stringify(currentYam, null, '\t'))
	} catch (e) {
	  console.log(e.message);
	  process.exit();
	}

	try {

	  previousYam = fs.readFileSync("./.lamp-lock.json", "utf8");
	  previousYam = JSON.parse(previousYam)
	} catch (e) {
	  console.log(e.message);
	  process.exit();
	}

	const diffify = (current, previous) => {

		// check if the user added any models
		
		let lastYaml = {}

		previous.Models.forEach(model => lastYaml[Object.entries(model)[0]] = true)

		let addedModels = current.Models.filter(model => !lastYaml[Object.entries(model)[0]])

		// traverse the current models to see if the user
		// added or changed any properties

		let modelUpdates = []

		current.Models.forEach( (model, i) =>{
			
			if(lastYaml[Object.entries(model)[0]]){ // not a completely new Model
											
				for(let part in model){

					let storeParts = part === 'Thunks' || part === "Slice" || part === "Actions"


					// if the user didn't previously define a part in the yaml
					
					if(!previous.Models[i][part] && storeParts && model[part]){

						model[part].forEach( newEntry => {

							modelUpdates.push( [ i, part, [ '+' , newEntry ] ]  )

						})

					}
					else{

						// else, lets see if they added anything to each part

						let thisDiff = diff( previous.Models[i][part], model[part] )

						if(thisDiff && !(part === 'CRUD')){

							if(!thisDiff.filter){
								console.log('Please added some property to: ', part)
								process.exit()
							}

							thisDiff = thisDiff.filter((diff, i) => diff[0] === "+" || diff[0] === '-')

							thisDiff.forEach(diff => {

								modelUpdates.push( [ i, part, diff ] )
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

module.exports = {
	makeLock,
	diffLock
}