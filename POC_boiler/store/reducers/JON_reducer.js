import actions from "./../constants/action_constants"


const initialState = {
	JONList : [],
	SingleJON: {}
}

export default function JON_reducer (state = initialState, action) {
	
	switch (action.type) {

		case actions.GET_JON: {
			return { ...state, SingleJON: action.payload }
		}

		case actions.GET_ALL_JON: {
			
			return { ...state, JONList: [...action.payload]}
		}

		case actions.ADD_JON: {
			return { ...state, JONList: [...state.JONList, action.payload ] }
		}

		case actions.UPDATE_JON: {
			const updatedJON = state.JONList.filter(item => item.id === action.payload.it)

			return {...state, SingleJON: updatedJON}
		}

		case actions.DELETE_JON: {
			const updatedJON = state.JONList.filter(item => item.id !== action.payload.it)

			return {...state, SingleJON: updatedJON}
		}

		default:
		  return state
	}
}