import actions from "./../actions/action_types_for_DUX"

const initialState = {
	DuxList : [],
	isLoading: false,
	SingleDux: {
		Name: '', 
        Quacking: true, 
        Ducklings: {}, 
        Fly2Gether: true,
	}
}

export default function Dux_reducer (state = initialState, action) {
	
	switch (action.type) {

		case actions.GET_DUX: {
			
			return { ...state, SingleDux: action.payload }
		}

		case actions.GET_ALL_DUX: {
			
			return { ...state, DuxList: [...action.payload]}
		}

		case actions.ADD_DUX: {

			return { ...state, DuxList: [...state.DuxList, action.payload ] }
		}

		case actions.UPDATE_DUX: {
			const updatedDux = state.DuxList.filter(item => item.id === action.payload.id)

			return {...state, SingleDux: updatedDux}
		}

		case actions.DELETE_DUX: {
			const updatedDux = state.DuxList.filter(item => item.id !== action.payload.id)

			return {...state, SingleDux: updatedDux}
		}

		default:
		  return state
	}
}