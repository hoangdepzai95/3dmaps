export const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
export const RECEIVE_LOGIN_FACEBOOK = 'RECEIVE_LOGIN_FACEBOOK';
export const LOGIN_GOOGLE = 'LOGIN_GOOGLE';
export const INIT_APP = 'INIT_APP';
export const RECEIVE_INIT_APP = 'RECEIVE_INIT_APP';
export const LOG_OUT = 'LOG_OUT';
export const SKIP_LOGIN = 'SKIP_LOGIN';

export function initApp() {
  return {
    type: INIT_APP,
  };
}

export function receiveInitApp(fbToken, ggToken, firstOpen) {
  return {
    type: RECEIVE_INIT_APP,
    fbToken,
    ggToken,
    firstOpen,
  };
}

export function loginFaceBook() {
  return {
    type: LOGIN_FACEBOOK,
  };
}

export function loginGoogle() {
  return {
    type: LOGIN_GOOGLE,
  };
}

export function receiveLoginFaceBook(token) {
  return {
    type: RECEIVE_LOGIN_FACEBOOK,
    token,
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
  };
}
export function skipLogin() {
  return {
    type: SKIP_LOGIN,
  };
}
