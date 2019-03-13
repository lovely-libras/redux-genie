import actions from "./actions"

const getHello = ( data ) => {

	return {
		type: actions.GET_HELLO,
		data
	}
}

const getAllHello = ( data ) => {

	return {
		type: actions.GET_ALL_HELLO,
		data
	}
}

const createHello = ( data ) => {

	return {

		type: actions.ADD_HELLO,
		data
	}
}

const updateHello = ( data ) => {

	return {

		type: actions.UPDATE_HELLO,
		data
	}
}

const deleteHello = ( data ) => {

	return {

		type: actions.DELETE_HELLO,
		data
	}
}

export default {

	getHello,
	getAllHello,
	createHello,
	updateHello,
	deleteHello
}