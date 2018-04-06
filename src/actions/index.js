
export const TO_COMMIT_FORM = 'FETCH_WEATHER';
export const NEW_COMMITMENT = 'NEW_COMMITMENT';

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




