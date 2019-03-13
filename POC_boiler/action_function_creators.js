import actions from "./actions"

const gethaha = ( data ) => {

	return {
		type: actions.GET_HAHA,
		data
	}
}

const getAllhaha = ( data ) => {

	return {
		type: actions.GET_ALL_HAHA,
		data
	}
}

const createhaha = ( data ) => {

	return {

		type: actions.ADD_HAHA,
		data
	}
}

const updatehaha = ( data ) => {

	return {

		type: actions.UPDATE_HAHA,
		data
	}
}

const deletehaha = ( data ) => {

	return {

		type: actions.DELETE_HAHA,
		data
	}
}

export default {

	gethaha,
	getAllhaha,
	createhaha,
	updatehaha,
	deletehaha
}