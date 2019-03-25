
// for the Rails model
const fs = require("fs");
const chalk = require('chalk')

module.exports = async (modelNames, structure) => {

	let fileLocation = structure === 'Rails' ? `${process.cwd()}/store/reducers/combine_reducers.js` : `${process.cwd()}/store/combine_reducers.js` ;

	fs.readFile(fileLocation, (err, data) => {

	    if (err) {
	        throw err;
	    }
	  	
	  	let newReducers = modelNames.reduce((a,b)=> a += `${b}_state,\n`, '')

	    let updatedFile = data.toString().slice(0, data.lastIndexOf('}')) + newReducers + '})'

	    let top = updatedFile.slice(0, updatedFile.indexOf('redux') + 7) 

	    let bottom = updatedFile.slice(updatedFile.indexOf('redux') + 7)

	    updatedFile = top + modelNames.reduce((a,b) => a += makeImportStatement(b, structure), '') + bottom

		fs.writeFile(

			fileLocation,
			
			updatedFile,

			() => {
			  console.log(chalk.yellow(`updated the combine reducer file to add ${modelNames}`));
			}
		);	    
	});
}


let makeImportStatement = (modelName, structure) => {

	modelName = modelName[0].toUpperCase().concat(modelName.slice(1))

	if(structure === 'Rails'){
	
		return `import ${modelName}_state from './reducer_for_${modelName}'\n`
	}
	if(structure === 'Ducks'){

		return `import ${modelName}_state from './${modelName}/reducer_for_${modelName}'\n`
	}
}
