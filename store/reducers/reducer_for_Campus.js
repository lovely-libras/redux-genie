import actions from "./../constants/action_constants_for_Campus"

const initialState = {
	CampusList : [],
	isLoading: false,
	SingleCampus: {
		Name: '', 
      Quacking: true, 
      Ducklings: {}, 
      Fly2Gether: true,
	}
}

export default function Campus_reducer (state = initialState, action) {
	
	switch (action.type) {

		case actions.countDux: {

			return { ...state }
		}
		
		case actions.migrateDux: {

			return { ...state }
		}
		
		case actions.quackOne: {

			return { ...state }
		}
		
		default:
		  return state
	}
}