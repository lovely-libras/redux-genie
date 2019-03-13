import actions from "./actions"

const getJON = ( payload ) => {

	return {
		type: actions.GET_JON,
		payload
	}
}

const getAllJON = ( payload ) => {

	return {
		type: actions.GET_ALL_JON,
		payload
	}
}

const createJON = ( payload ) => {

	return {

		type: actions.ADD_JON,
		payload
	}
}

const updateJON = ( payload ) => {

	return {

		type: actions.UPDATE_JON,
		payload
	}
}

const deleteJON = ( payload ) => {

	return {

		type: actions.DELETE_JON,
		payload
	}
}

export default {
	getJON,
	getAllJON,
	createJON,
	updateJON,
	deleteJON
}