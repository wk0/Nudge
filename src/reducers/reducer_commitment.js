import { TO_COMMIT_FORM, NEW_COMMITMENT, REQUEST_COMMITMENT, RECEIVE_COMMITMENT } from '../actions/index';

export default function(state= {isFetching: false, commitment:[]}, action){
  switch (action.type){
    case NEW_COMMITMENT:
      return [action.payload, ...state]
    case TO_COMMIT_FORM:
      return [ action.payload, action.userAddr, ...state];
    case REQUEST_COMMITMENT:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_COMMITMENT:
      return Object.assign({}, state, {
        isFetching: false,
        commitment: action.payload,
        lastUpdated: action.receivedAt
      })
    default:
      return state;
  }
}