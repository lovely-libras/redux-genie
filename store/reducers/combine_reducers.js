import { combineReducers } from 'redux'
import Campus_state from './reducer_for_Campus'
import Terminator_state from './reducer_for_Terminator'

export default combineReducers({
	Campus_state,
	Terminator_state,
});