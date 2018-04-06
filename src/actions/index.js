
export const TO_COMMIT_FORM = 'FETCH_WEATHER';
export const NEW_COMMITMENT = 'NEW_COMMITMENT';
export const CONFIRMED_COMMITMENT = 'CONFIRMED_COMMITMENT';


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

export function confirmedCommitment(confirmedCommitment) {
  return {
    type: CONFIRMED_COMMITMENT,
    payload: confirmedCommitment
  }
}



