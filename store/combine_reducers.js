import { combineReducers } from 'redux'
import Dux_state from './Dux/Dux_reducer'
import Terminator_state from './Terminator/Terminator_reducer'

export default combineReducers({
 Dux_state,
 Terminator_state,
})