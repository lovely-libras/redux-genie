import actions from "../constants/action_constants"

const getCampus = ( payload ) => {

	return {
		type: actions.GET_CAMPUS,
		payload
	}
}

const getAllCampus = ( payload ) => {

	return {
		type: actions.GET_ALL_CAMPUS,
		payload
	}
}

const createCampus = ( payload ) => {

	return {

		type: actions.ADD_CAMPUS,
		payload
	}
}

const updateCampus = ( payload ) => {

	return {

		type: actions.UPDATE_CAMPUS,
		payload
	}
}

const deleteCampus = ( payload ) => {

	return {

		type: actions.DELETE_CAMPUS,
		payload
	}

}

const countDux = (payload) => {
      	return {
      		type: actions.COUNTDUX,
      		payload
      	}
      }

export default {

	getCampus,
	getAllCampus,
	createCampus,
	updateCampus,
	deleteCampus,
	countDux,
}