import _ from 'lodash';
import { SET_ACTIVE_TAB, BACK_TAB, CHANGE_LOADING } from '../actions/layout';

const initialState = {
  activeTab: '',
  prevTab: '',
  loading: false,
};

const layout = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return _.assign({}, state, { activeTab: action.tabId, prevTab: state.activeTab });
    case BACK_TAB:
      return _.assign({}, state, { activeTab: state.prevTab || state.activeTab, prevTab: '' });
    case CHANGE_LOADING:
      return _.assign({}, state, { loading: action.loading });
    default:
      return state;
  }
};
export default layout;
