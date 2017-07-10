export const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const RECEIVE_CHECK_LOGIN = 'RECEIVE_CHECK_LOGIN';

export function checkLogin() {
  return {
    type: CHECK_LOGIN,
  };
}

export function receiveCheckLogin(fbTooken, ggTooken, firstOpen) {
  console.log(fbTooken, ggTooken, firstOpen);
  return {
    type: RECEIVE_CHECK_LOGIN,
    fbTooken,
    ggTooken,
    firstOpen,
  };
}
