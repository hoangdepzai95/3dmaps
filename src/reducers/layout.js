import _ from 'lodash';
import { SET_ACTIVE_TAB, BACK_TAB, CHANGE_LOADING } from '../actions/layout';
import { INIT_APP } from '../actions/auth';

const initialState = {
  activeTab: '',
  prevTab: '',
  loading: false,
  App: null,
};

const layout = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return _.assign({}, state, { activeTab: action.tabId, prevTab: state.activeTab });
    case BACK_TAB:
      return _.assign({}, state, { activeTab: state.prevTab || state.activeTab, prevTab: '' });
    case CHANGE_LOADING:
      return _.assign({}, state, { loading: action.loading });
    case INIT_APP:
      return _.assign({}, state, { App: action.App });
    default:
      return state;
  }
};
export default layout;
