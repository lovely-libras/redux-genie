import actions from "./../constants/action_constants"


const initialState = {
	GREGList : [],
	SingleGREG: {}
}

export default function GREG_reducer (state = initialState, action) {
	
	switch (action.type) {

		case actions.GET_GREG: {
			return { ...state, SingleGREG: action.payload }
		}

		case actions.GET_ALL_GREG: {
			
			return { ...state, GREGList: [...action.payload]}
		}

		case actions.ADD_GREG: {
			return { ...state, GREGList: [...state.GREGList, action.payload ] }
		}

		case actions.UPDATE_GREG: {
			const updatedGREG = state.GREGList.filter(item => item.id === action.payload.it)

			return {...state, SingleGREG: updatedGREG}
		}

		case actions.DELETE_GREG: {
			const updatedGREG = state.GREGList.filter(item => item.id !== action.payload.it)

			return {...state, SingleGREG: updatedGREG}
		}

		default:
		  return state
	}
}