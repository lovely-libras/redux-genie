// for proof of concept, we are creating a "rails model"
// the final product will allow the user to specify the file structure
// based on the suggested structures: https://redux.js.org/faq/code-structure

const fs = require('fs')
let { spawn } = require('child_process')
const { action_boiler_Rails_model,  actionTypes_boiler, reducer_creator } = require('./boiler_index')

// removing previous version of the POC folder

let makeDir= spawn('mkdir POC_boiler POC_boiler/store POC_boiler/store/actions POC_boiler/store/constants POC_boiler/store/reducers', { shell: true })

let models = process.argv.slice(2); // if bash = node proof_of_concept.js Monkey Parakeet, then models = "Monkey Parakeet"

makeDir.on('exit', () => {

	fs.writeFile('./POC_boiler/store/constants/action_constants.js', 
				 actionTypes_boiler(models), 
				 () => { 
					 console.log('actionTypes_boiler')
					 
				 } 
				)

	models.forEach(model => {

		fs.writeFile(`./POC_boiler/store/actions/action_types_for_${model}.js`, 
						action_boiler_Rails_model(model), 
						() => { 
							console.log(`made action types for ${model}`)
						}
					)
		
		fs.writeFile(`./POC_boiler/store/reducers/${model}_reducer.js`, 
					 reducer_creator(model), 
					 () => { 
						 console.log(`made reducer_creator for ${model}`)	 
					 } 
					)
		
	})

})


// these will be used with different models:
// fs.writeFile('./POC_boiler/action_function_creators.js', actionFuncs_boiler(process.argv.slice(2)), () => console.log('actionFuncs_boiler'))


