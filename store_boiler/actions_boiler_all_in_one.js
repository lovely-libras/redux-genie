// this is an action creator boiler plate for putting multiple model files 
// into one big file- the Rail pattern option will create separate action creator 
// files for each model

 
let bodyMaker = (modelName) => {

return `const get${modelName} = ( data ) => {

	return {
		type: actions.GET_${modelName.toUpperCase()},
		data
	}
}

const getAll${modelName} = ( data ) => {

	return {
		type: actions.GET_ALL_${modelName.toUpperCase()},
		data
	}
}

const create${modelName} = ( data ) => {

	return {

		type: actions.ADD_${modelName.toUpperCase()},
		data
	}
}

const update${modelName} = ( data ) => {

	return {

		type: actions.UPDATE_${modelName.toUpperCase()},
		data
	}
}

const delete${modelName} = ( data ) => {

	return {

		type: actions.DELETE_${modelName.toUpperCase()},
		data
	}
}

` 
}

let exportStatementMaker = (modelName) => {

return `
	get${modelName},
	getAll${modelName},
	create${modelName},
	update${modelName},
	delete${modelName}`
}

module.exports = (modelNames) => {

let body = modelNames.reduce((a,b) => a += bodyMaker(b), '')

let exportStatement = modelNames.reduce((a,b) => a += exportStatementMaker(b), '')

return `import actions from "./actions"` + '\n\n' + body + `export default {\n` + exportStatement + `\n}`
}