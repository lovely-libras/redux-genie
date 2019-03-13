import actions from "./../constants/action_constants"


const initialState = {
	AMYList : [],
	SingleAMY: {}
}

export default function AMY_reducer (state = initialState, action) {
	
	switch (action.type) {

		case actions.GET_AMY: {
			return { ...state, SingleAMY: action.payload }
		}

		case actions.GET_ALL_AMY: {
			
			return { ...state, AMYList: [...action.payload]}
		}

		case actions.ADD_AMY: {
			return { ...state, AMYList: [...state.AMYList, action.payload ] }
		}

		case actions.UPDATE_AMY: {
			const updatedAMY = state.AMYList.filter(item => item.id === action.payload.it)

			return {...state, SingleAMY: updatedAMY}
		}

		case actions.DELETE_AMY: {
			const updatedAMY = state.AMYList.filter(item => item.id !== action.payload.it)

			return {...state, SingleAMY: updatedAMY}
		}

		default:
		  return state
	}
}