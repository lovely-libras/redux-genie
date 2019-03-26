import actions from "../constants/action_constants"

const getDucklings = ( payload ) => {

	return {
		type: actions.GET_DUCKLINGS,
		payload
	}
}

const getAllDucklings = ( payload ) => {

	return {
		type: actions.GET_ALL_DUCKLINGS,
		payload
	}
}

const createDucklings = ( payload ) => {

	return {

		type: actions.ADD_DUCKLINGS,
		payload
	}
}

const updateDucklings = ( payload ) => {

	return {

		type: actions.UPDATE_DUCKLINGS,
		payload
	}
}

const deleteDucklings = ( payload ) => {

	return {

		type: actions.DELETE_DUCKLINGS,
		payload
	}

}

const countDucklings = (payload) => {
      	return {
      		type: actions.COUNTDUCKLINGS,
      		payload
      	}
      }

export default {

	getDucklings,
	getAllDucklings,
	createDucklings,
	updateDucklings,
	deleteDucklings,
	countDucklings,
}