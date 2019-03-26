import actions from "./../constants/action_constants"

const initialState = {
	TerminatorList : [],
	isLoading: false,
	SingleTerminator: {
		WillBeBack: true, 
      OneLiners: [], 
      Sequels: 0,
	}
}

export default function Terminator_reducer (state = initialState, action) {
	
	switch (action.type) {

		case actions.GET_TERMINATOR: {
			
			return { ...state, SingleTerminator: action.payload }
		}

		case actions.GET_ALL_TERMINATOR: {
			
			return { ...state, TerminatorList: [...action.payload]}
		}

		case actions.ADD_TERMINATOR: {

			return { ...state, TerminatorList: [...state.TerminatorList, action.payload ] }
		}

		case actions.UPDATE_TERMINATOR: {
			const updatedTerminator = state.TerminatorList.filter(item => item.id === action.payload.id)

			return {...state, SingleTerminator: updatedTerminator}
		}

		case actions.DELETE_TERMINATOR: {
			const updatedTerminator = state.TerminatorList.filter(item => item.id !== action.payload.id)

			return {...state, SingleTerminator: updatedTerminator}
		}
		
		default:
		  return state
	}
}