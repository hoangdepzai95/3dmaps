export const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
export const INIT_APP = 'INIT_APP';
export const RECEIVE_INIT_APP = 'RECEIVE_INIT_APP';

export function initApp() {
  console.log('init')
  return {
    type: INIT_APP,
  };
}

export function receiveInitApp(fbTooken, ggTooken, firstOpen) {
  return {
    type: RECEIVE_INIT_APP,
    fbTooken,
    ggTooken,
    firstOpen,
  };
}
