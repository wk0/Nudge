import getWeb3 from "./../util/web3/getWeb3"

export const TO_COMMIT_FORM = 'FETCH_WEATHER';
export const NEW_COMMITMENT = 'NEW_COMMITMENT';
export const REQUEST_COMMITMENT = 'REQUEST_COMMITMENT';
export const RECEIVE_COMMITMENT = 'RECEIVE_COMMITMENT';

export function toCommitForm(landingCommitment, userAddr) {
  return {
    type: TO_COMMIT_FORM,
    payload: landingCommitment,
    userAddr: userAddr
  };
}

export function newCommitment(commitment) {
  return {
    type: NEW_COMMITMENT,
    payload: commitment
  }
}

export function requestCommitment() {
  console.log("request commitment")
  return {
    type: REQUEST_COMMITMENT
  }
}

// Thunk action creator
export function confirmedCommitment(confirmedCommitment) {
  // Thunk middleware passes the dispatch method as an argument to 
  // the function, thus making it able to dispatch actions itself
  console.log("Create contract with terms here, terms:", confirmedCommitment);

  return function(dispatch){
    // First dispatch, app state updated that call is starting 
    dispatch(requestCommitment())
  
    return getWeb3
      .then((web3) => {
        if(web3){
          web3.payload.web3Instance.eth.getAccounts((err, res) => {
            if(!err){
              console.log(res, confirmedCommitment)
              

              dispatch(receiveCommitment(res))
            }
          });
        }
    })
  }
}

export function receiveCommitment(response){
  console.log("receive commitment", response)
  return {
    type: RECEIVE_COMMITMENT,
    payload: response,
    receivedAt: Date.now()
  }
}
