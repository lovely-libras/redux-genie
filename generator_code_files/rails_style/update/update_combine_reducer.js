
// for the Rails model
const fs = require("fs");
const chalk = require('chalk')

module.exports = async (modelNames) => {

	let fileLocation = `${process.cwd()}/store/reducers/combine_reducers.js`

	fs.readFile(fileLocation, (err, data) => {

	    if (err) {
	        throw err;
	    }
	  	
	  	let newReducers = modelNames.reduce((a,b)=> a += `	${b}_state,`, '')

	    let updatedFile = data.toString().slice(0, data.lastIndexOf('}')) + newReducers + '\n}'

	    console.log(updatedFile)

		fs.writeFile(

			fileLocation,
			
			updatedFile,

			() => {
			  console.log(chalk.yellow(`updated the combine reducer file to add ${modelNames}`));
			}
		);	    
	});

}
