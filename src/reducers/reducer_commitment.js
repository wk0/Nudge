import { TO_COMMIT_FORM } from '../actions/index';

export default function(state= [], action){
  switch (action.type){
    case TO_COMMIT_FORM:
      // Return a new state, dont change state!     
      // New ES6 synax [ city, city, city]. Not [city, [city]]
      return [ action.payload, ...state];
    default:
      return state;
  }
}
