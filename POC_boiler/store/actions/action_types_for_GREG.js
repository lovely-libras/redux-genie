import actions from "./actions"

const getGREG = ( payload ) => {

	return {
		type: actions.GET_GREG,
		payload
	}
}

const getAllGREG = ( payload ) => {

	return {
		type: actions.GET_ALL_GREG,
		payload
	}
}

const createGREG = ( payload ) => {

	return {

		type: actions.ADD_GREG,
		payload
	}
}

const updateGREG = ( payload ) => {

	return {

		type: actions.UPDATE_GREG,
		payload
	}
}

const deleteGREG = ( payload ) => {

	return {

		type: actions.DELETE_GREG,
		payload
	}
}

export default {
	getGREG,
	getAllGREG,
	createGREG,
	updateGREG,
	deleteGREG
}