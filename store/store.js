import { createStore } from 'redux'
import combinedReducers from './combine_reducers'
  
export default createStore(combinedReducers)