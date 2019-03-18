import actions from "./../actions/action_types_for_CAMPUS"

const initialState = {
	CampusList : [],
	SingleCampus: {
		Name: '', 
        Address: true, 
        Phone Number: [],
	}
}

export default function Campus_reducer (state = initialState, action) {
	
	switch (action.type) {

		case actions.GET_CAMPUS: {
			return { ...state, SingleCampus: action.payload }
		}

		case actions.GET_ALL_CAMPUS: {
			
			return { ...state, CampusList: [...action.payload]}
		}

		case actions.ADD_CAMPUS: {
			return { ...state, CampusList: [...state.CampusList, action.payload ] }
		}

		case actions.UPDATE_CAMPUS: {
			const updatedCampus = state.CampusList.filter(item => item.id === action.payload.it)

			return {...state, SingleCampus: updatedCampus}
		}

		case actions.DELETE_CAMPUS: {
			const updatedCampus = state.CampusList.filter(item => item.id !== action.payload.it)

			return {...state, SingleCampus: updatedCampus}
		}

		default:
		  return state
	}
}