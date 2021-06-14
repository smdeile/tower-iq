import {createStore, applyMiddleware} from 'redux'
import usersReducer from './usersReducer'
import thunk from 'redux-thunk'

const store=createStore(usersReducer, applyMiddleware(thunk))

export default store