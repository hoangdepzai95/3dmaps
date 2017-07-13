import _ from 'lodash';
import { RECEIVE_INIT_APP, RECEIVE_LOGIN_FACEBOOK, LOG_OUT } from '../actions/auth';

const initialState = {
  firstOpenApp: false,
  initDone: false,
  authType: '',
  token: '',
};

const login = (state = initialState, action) => {
  let authType = '';
  switch (action.type) {
    case RECEIVE_INIT_APP:
      if (action.fbToken) {
        authType = 'facebook';
      } else if (action.ggToken) {
        authType = 'google';
      }
      return {
        firstOpenApp: action.firstOpen !== '1',
        initDone: true,
        token: action.fbToken || action.ggToken,
        authType,
      };
    case RECEIVE_LOGIN_FACEBOOK:
      return _.assign({}, state, { token: action.token, authType: 'facebook' });
    case LOG_OUT :
      return _.assign({}, state, { token: '', authType: '' });
    default:
      return state;
  }
};
export default login;
