const fs = require("fs").promises;

module.exports = async (model, Thunks)=> {

	let modelName 

	let originalFile
	
	/* 
		First I want to read the originalFile-
		we should update the file based on its
		current state rather than the yaml,
		in case the user updates it manually without
		using the genie

	*/
	
	await fs.readFile('./store/actions/actions', (err, data) => {

	    if (err) {
	        throw err;
	    }
	    originalFile = data;

	    console.log(file);
	    processFile();    
	});

	let newData = 

	function processFile(newData, originalFile) {

	    // console.log(file);

	}

	await fs.writeFile(

		`./store/actions/actions_for_${modelName}.js`,
		
		newFile,

		() => {
		  console.log(chalk.yellow(`updated the action creator file to add ${modelName}`));
		}
	);
}

