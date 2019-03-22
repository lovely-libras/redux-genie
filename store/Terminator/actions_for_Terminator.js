import actions from "../constants/action_constants"

const getTerminator = ( payload ) => {

	return {
		type: actions.GET_TERMINATOR,
		payload
	}
}

const getAllTerminator = ( payload ) => {

	return {
		type: actions.GET_ALL_TERMINATOR,
		payload
	}
}

const createTerminator = ( payload ) => {

	return {

		type: actions.ADD_TERMINATOR,
		payload
	}
}

const updateTerminator = ( payload ) => {

	return {

		type: actions.UPDATE_TERMINATOR,
		payload
	}
}

const deleteTerminator = ( payload ) => {

	return {

		type: actions.DELETE_TERMINATOR,
		payload
	}

}

export default {

	getTerminator,
	getAllTerminator,
	createTerminator,
	updateTerminator,
	deleteTerminator,
}