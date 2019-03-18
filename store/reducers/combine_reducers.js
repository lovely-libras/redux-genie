import { combineReducers } from 'redux'
import Campus_state from './Campus_reducer'
import Student_state from './Student_reducer'

export default combineReducers({
	Campus_state,
	Student_state,
});