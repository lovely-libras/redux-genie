// this is an action creator boiler plate for the Rail pattern
// separate file for each model

module.exports = modelName => {
  return `import actions from "../constants/action_constants"

const get${modelName} = ( payload ) => {

	return {
		type: actions.GET_${modelName.toUpperCase()},
		payload
	}
}

const getAll${modelName} = ( payload ) => {

	return {
		type: actions.GET_ALL_${modelName.toUpperCase()},
		payload
	}
}

const create${modelName} = ( payload ) => {

	return {

		type: actions.ADD_${modelName.toUpperCase()},
		payload
	}
}

const update${modelName} = ( payload ) => {

	return {

		type: actions.UPDATE_${modelName.toUpperCase()},
		payload
	}
}

const delete${modelName} = ( payload ) => {

	return {

		type: actions.DELETE_${modelName.toUpperCase()},
		payload
	}
}

export default {
	get${modelName},
	getAll${modelName},
	create${modelName},
	update${modelName},
	delete${modelName}
}`;
};
