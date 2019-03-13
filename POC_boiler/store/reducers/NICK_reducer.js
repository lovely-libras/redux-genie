import actions from "./../constants/action_constants"


const initialState = {
	NICKList : [],
	SingleNICK: {}
}

export default function NICK_reducer (state = initialState, action) {
	
	switch (action.type) {

		case actions.GET_NICK: {
			return { ...state, SingleNICK: action.payload }
		}

		case actions.GET_ALL_NICK: {
			
			return { ...state, NICKList: [...action.payload]}
		}

		case actions.ADD_NICK: {
			return { ...state, NICKList: [...state.NICKList, action.payload ] }
		}

		case actions.UPDATE_NICK: {
			const updatedNICK = state.NICKList.filter(item => item.id === action.payload.it)

			return {...state, SingleNICK: updatedNICK}
		}

		case actions.DELETE_NICK: {
			const updatedNICK = state.NICKList.filter(item => item.id !== action.payload.it)

			return {...state, SingleNICK: updatedNICK}
		}

		default:
		  return state
	}
}