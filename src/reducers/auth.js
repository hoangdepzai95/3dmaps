import _ from 'lodash';
import {
  RECEIVE_INIT_APP,
  RECEIVE_LOGIN_FACEBOOK,
  LOG_OUT,
  SKIP_LOGIN,
  RECEIVE_USER_INFO,
} from '../actions/auth';

const initialState = {
  firstOpenApp: false,
  initDone: false,
  authType: '',
  token: '',
  locale: '',
  userInfo: {},
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
        locale: action.locale,
      };
    case RECEIVE_LOGIN_FACEBOOK:
      return _.assign({}, state, { token: action.token, authType: 'facebook' });
    case LOG_OUT :
      return _.assign({}, state, { token: '', authType: '' });
    case SKIP_LOGIN:
      return _.assign({}, state, { authType: 'guest' });
    case RECEIVE_USER_INFO:
      return _.assign({}, state, { userInfo: action.userInfo });
    default:
      return state;
  }
};
export default login;
