import { TO_COMMIT_FORM, NEW_COMMITMENT, CONFIRMED_COMMITMENT } from '../actions/index';

export default function(state= [], action){
  switch (action.type){
    case NEW_COMMITMENT:
      return [action.payload, ...state]
    case TO_COMMIT_FORM:
      // Return a new state, dont change state!     
      // New ES6 synax [ city, city, city]. Not [city, [city]]
      return [ action.payload, action.userAddr, ...state];
    case CONFIRMED_COMMITMENT:
      console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
}