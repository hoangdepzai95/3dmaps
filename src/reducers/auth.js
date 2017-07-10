import { RECEIVE_INIT_APP } from '../actions/auth';

const initialState = {
  firstOpenApp: false,
  initDone: false,
  authType: '',
  token: '',
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_INIT_APP:
      return {
        firstOpenApp: action.firstOpen !== '1',
        initDone: true,
        token: action.fbTooken || action.ggTooken,
        authType: action.fbTooken ? 'facebook' : 'google',
      };
    default:
      return state;
  }
};
export default login;
