// this is an action creator boiler plate for the Rail pattern
// separate file for each model

module.exports = modelName => {
  return `import actions from "../constants/action_constants"

const get${modelName} = ( payload ) => {

	return {
		type: actions.GET_${modelName},
		payload
	}
}

const getAll${modelName} = ( payload ) => {

	return {
		type: actions.GET_ALL_${modelName},
		payload
	}
}

const create${modelName} = ( payload ) => {

	return {

		type: actions.ADD_${modelName},
		payload
	}
}

const update${modelName} = ( payload ) => {

	return {

		type: actions.UPDATE_${modelName},
		payload
	}
}

const delete${modelName} = ( payload ) => {

	return {

		type: actions.DELETE_${modelName},
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
