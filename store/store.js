import { createStore } from 'redux'
import combinedReducers from './reducers/combine_reducers'

export default createStore(combinedReducers)