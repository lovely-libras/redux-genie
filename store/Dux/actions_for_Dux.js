import actions from "../constants/action_constants"

const getDux = ( payload ) => {

	return {
		type: actions.GET_DUX,
		payload
	}
}

const getAllDux = ( payload ) => {

	return {
		type: actions.GET_ALL_DUX,
		payload
	}
}

const createDux = ( payload ) => {

	return {

		type: actions.ADD_DUX,
		payload
	}
}

const updateDux = ( payload ) => {

	return {

		type: actions.UPDATE_DUX,
		payload
	}
}

const deleteDux = ( payload ) => {

	return {

		type: actions.DELETE_DUX,
		payload
	}

}

export default {

	getDux,
	getAllDux,
	createDux,
	updateDux,
	deleteDux,
}