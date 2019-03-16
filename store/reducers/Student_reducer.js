import actions from "./../actions/action_types_for_STUDENT"

const initialState = {
	StudentList : [],
	SingleStudent: {
		First Name: 0, 
        Last Name: true, 
        Campus: [], 
        GPA: 0,
	}
}

export default function Student_reducer (state = initialState, action) {
	
	switch (action.type) {

		case actions.GET_STUDENT: {
			return { ...state, SingleStudent: action.payload }
		}

		case actions.GET_ALL_STUDENT: {
			
			return { ...state, StudentList: [...action.payload]}
		}

		case actions.ADD_STUDENT: {
			return { ...state, StudentList: [...state.StudentList, action.payload ] }
		}

		case actions.UPDATE_STUDENT: {
			const updatedStudent = state.StudentList.filter(item => item.id === action.payload.it)

			return {...state, SingleStudent: updatedStudent}
		}

		case actions.DELETE_STUDENT: {
			const updatedStudent = state.StudentList.filter(item => item.id !== action.payload.it)

			return {...state, SingleStudent: updatedStudent}
		}

		default:
		  return state
	}
}