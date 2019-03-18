module.exports = modelName => {
  const modelUpperCase = modelName.toUpperCase();

  return `import actions from "../constants/action_constants"

const get${modelName} = ( payload ) => {

	return {
		type: actions.GET_${modelUpperCase},
		payload
	}
}

const getAll${modelName} = ( payload ) => {

	return {
		type: actions.GET_ALL_${modelUpperCase},
		payload
	}
}

const create${modelName} = ( payload ) => {

	return {

		type: actions.ADD_${modelUpperCase},
		payload
	}
}

const update${modelName} = ( payload ) => {

	return {

		type: actions.UPDATE_${modelUpperCase},
		payload
	}
}

const delete${modelName} = ( payload ) => {

	return {

		type: actions.DELETE_${modelUpperCase},
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
