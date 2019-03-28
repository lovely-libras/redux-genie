import { combineReducers } from 'redux'
import Horses_state from './Horses/reducer_for_Horses'
import CobraChicken_state from './CobraChicken/reducer_for_CobraChicken'

export default combineReducers({
 Horses_state,
 CobraChicken_state,
})