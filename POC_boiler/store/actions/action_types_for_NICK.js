import actions from "./actions"

const getNICK = ( payload ) => {

	return {
		type: actions.GET_NICK,
		payload
	}
}

const getAllNICK = ( payload ) => {

	return {
		type: actions.GET_ALL_NICK,
		payload
	}
}

const createNICK = ( payload ) => {

	return {

		type: actions.ADD_NICK,
		payload
	}
}

const updateNICK = ( payload ) => {

	return {

		type: actions.UPDATE_NICK,
		payload
	}
}

const deleteNICK = ( payload ) => {

	return {

		type: actions.DELETE_NICK,
		payload
	}
}

export default {
	getNICK,
	getAllNICK,
	createNICK,
	updateNICK,
	deleteNICK
}