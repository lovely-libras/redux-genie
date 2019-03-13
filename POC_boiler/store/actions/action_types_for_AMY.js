import actions from "./actions"

const getAMY = ( payload ) => {

	return {
		type: actions.GET_AMY,
		payload
	}
}

const getAllAMY = ( payload ) => {

	return {
		type: actions.GET_ALL_AMY,
		payload
	}
}

const createAMY = ( payload ) => {

	return {

		type: actions.ADD_AMY,
		payload
	}
}

const updateAMY = ( payload ) => {

	return {

		type: actions.UPDATE_AMY,
		payload
	}
}

const deleteAMY = ( payload ) => {

	return {

		type: actions.DELETE_AMY,
		payload
	}
}

export default {
	getAMY,
	getAllAMY,
	createAMY,
	updateAMY,
	deleteAMY
}