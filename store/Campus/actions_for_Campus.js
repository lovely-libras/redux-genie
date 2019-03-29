import actions from "./action_constants_for_Campus"

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

const migrateDux = (payload) => {
      	return {
      		type: actions.MIGRATEDUX,
      		payload
      	}
      }

export const getAll = () => dispatch => {
	fetch('/api/Dux,countDux')
		.then((resp) => resp.json()) 
		.then(function(data) {
			dispatch(data)
  });
};

export const getOne = () => dispatch => {
	fetch('/api/Dux/:dux,migrateDux')
		.then((resp) => resp.json()) 
		.then(function(data) {
			dispatch(data)
  });
};

export default {

	getCampus,
	getAllCampus,
	createCampus,
	updateCampus,
	deleteCampus,
	countDux,
	migrateDux,
}