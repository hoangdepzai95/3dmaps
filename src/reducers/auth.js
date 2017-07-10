import { RECEIVE_CHECK_LOGIN } from '../actions/auth';

const initialState = {
  firstOpenApp: false,
  authChecked: false,
  authType: '',
  token: '',
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CHECK_LOGIN:
      return {
        firstOpenApp: action.firstOpen !== '1',
        authChecked: true,
        token: action.fbTooken || action.ggTooken,
        authType: action.fbTooken ? 'facebook' : 'google',
      };
    default:
      return state;
  }
};
export default login;
