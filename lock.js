// these are the methods to interact with the .lamp.lock.json file
const fs = require("fs");
const yaml = require("js-yaml");
const { diff } = require('json-diff')

const makeLock = (yams) => {

	fs.writeFile(
	    "./.lamp-lock.json",
	    JSON.stringify(yams, null, "\t"),
	    () => {
	    }
	);

}

const diffLock = () => {

	let yams
	let locked 

	try {

	  yams = yaml.safeLoad(fs.readFileSync("./lamp.config.yml", "utf8"));
	  yams = JSON.parse(JSON.stringify(yams, null, '\t'))
	} catch (e) {
	  console.log(e.message);
	  process.exit();
	}

	try {

	  locked = fs.readFileSync("./.lamp-lock.json", "utf8");
	  locked = JSON.parse(locked)
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
					if(!previous.Models[i][part] && storeParts){

						modelUpdates.push(i, part, [ '+' , model[part]] )
					}
					else{

						// else, lets see if they added anything to each part
						let thisDiff = diff( previous.Models[i][part], model[part] )

						if(thisDiff){

							modelUpdates.push( [i, part, thisDiff[2] ] )
						}
					}
				}
			}
		})

		let updates = { addedModels, modelUpdates }
	}

	return diffify(yams, locked)
}

module.exports = {
	makeLock,
	diffLock
}