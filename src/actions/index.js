
export const TO_COMMIT_FORM = 'FETCH_WEATHER';

export function toCommitForm(commitment, userAddr) {
  return {
    type: TO_COMMIT_FORM,
    payload: commitment,
    userAddr: userAddr
  };
}





