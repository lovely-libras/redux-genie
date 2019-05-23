const fs = require('fs')
const parser = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const chalk = require('chalk')
module.exports = (kind, model) => {

	let Structure

	try {

		Structure = JSON.parse(fs.readFileSync("./.lamp-lock.json", "utf8")).Structure

	} 
	catch (err) {

		console.error('.lamp-lock.json not found- please make connect call inside root project directory')
	}

	kind === 'Actions' ? kind = 'actions' : kind === 'Thunks' ? kind === 'thunks' : '' ;

	kindTwo = kind === 'actions' ? 'actions' : 'reducers' ;

	let filePath = Structure === 'Ducks' ? `./store/${model}/${kind}_for_${model}.js` : 
	                    `./store/actions/${kind}_for_${model}.js`

	let file 

	try {

		file = fs.readFileSync(filePath).toString();
	}
	catch(err){
		
		console.error(`No ${kind} for ${model}`)
	}

	const fileAST = parser(file, {sourceType: 'module', plugins: ['jsx']});
	
	let payload = []

	traverse(fileAST, {
	  ExportDefaultDeclaration(path){

	    path.node.declaration.properties.forEach(prop=>{

	      payload.push(prop.key.name)
	    })
	  }
	})

	console.log(chalk.red(model +  " " + kind + ": \n"))
	console.log(chalk.yellow(payload.join('\n') + '\n'))
}

