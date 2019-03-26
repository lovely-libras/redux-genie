import actions from "./../constants/action_constants"

const initialState = {
	DucklingsList : [],
	isLoading: false,
	SingleDucklings: {
		Name: '',
	}
}

export default function Ducklings_reducer (state = initialState, action) {
	
	switch (action.type) {

		case actions.GET_DUCKLINGS: {
			
			return { ...state, SingleDucklings: action.payload }
		}

		case actions.GET_ALL_DUCKLINGS: {
			
			return { ...state, DucklingsList: [...action.payload]}
		}

		case actions.ADD_DUCKLINGS: {

			return { ...state, DucklingsList: [...state.DucklingsList, action.payload ] }
		}

		case actions.UPDATE_DUCKLINGS: {
			const updatedDucklings = state.DucklingsList.filter(item => item.id === action.payload.id)

			return {...state, SingleDucklings: updatedDucklings}
		}

		case actions.DELETE_DUCKLINGS: {
			const updatedDucklings = state.DucklingsList.filter(item => item.id !== action.payload.id)

			return {...state, SingleDucklings: updatedDucklings}
		}
		
		case actions.countDucklings: {

			return { ...state }
		}
		
		default:
		  return state
	}
}