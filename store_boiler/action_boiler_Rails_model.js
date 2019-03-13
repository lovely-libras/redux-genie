// this is an action creator boiler plate for the Rail pattern 
// separate file for each model 
 
module.exports = (modelName) => {

return `import actions from "./actions"

const get${modelName} = ( data ) => {

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

export default {
	get${modelName},
	getAll${modelName},
	create${modelName},
	update${modelName},
	delete${modelName}
}`

}

