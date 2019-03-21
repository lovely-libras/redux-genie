const fs = require("fs");

module.exports = (modelName)=> {

	var text;
	// First I want to read the file
	fs.readFile('./store/actions/actions.html', (err, data) => {

	    if (err) {
	        throw err;
	    }
	    text = data;
	    console.log(text);
	    processFile();    
	});

	function processFile() {

	    // console.log(text);

	}


	fs.writeFile(

		`./store/actions/actions_for_${modelName}.js`,
		
		action_boiler_Rails_model(modelName, model, Thunks),

		() => {
		  console.log(chalk.yellow(`updated actions for ${modelName}`));
		}
	);
}