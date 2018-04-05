import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from '../user/userReducer';
import { reducer as formReducer } from 'redux-form';
import commitmentReducer from './reducer_commitment';
import web3Reducer from '../util/web3/web3Reducer';


const reducer = combineReducers({
  web3: web3Reducer,
  commitment: commitmentReducer,
  form: formReducer,
  routing: routerReducer,
  user: userReducer
})

export default reducer
