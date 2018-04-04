import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from '../user/userReducer'
import commitmentReducer from './reducer_commitment';

const reducer = combineReducers({
  commitment: commitmentReducer,
  routing: routerReducer,
  user: userReducer
})

export default reducer
