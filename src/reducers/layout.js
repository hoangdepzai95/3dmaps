import _ from 'lodash';
import {
  SET_ACTIVE_TAB,
  BACK_TAB,
  CHANGE_LOADING,
  PUSH_SUB_TAB,
  POP_SUB_TAB,
  SET_ACTIVE_GALLERY,
  SET_ACTIVE_CATEGORY,
} from '../actions/layout';
import { INIT_APP } from '../actions/auth';

const initialState = {
  activeTab: '',
  prevTab: '',
  loading: false,
  App: null,
  stackHome: [],
  stackExperience: [],
  activeGallery: null,
  activeCategory: null,
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
    case PUSH_SUB_TAB:
      return _.assign({}, state,
        { [action.stackName]: [...state[action.stackName], action.subTab] },
      );
    case POP_SUB_TAB:
      return _.assign({}, state, { [action.stackName]: _.dropRight(state[action.stackName]) });
    case SET_ACTIVE_GALLERY:
      return _.assign({}, state, { activeGallery: action.id });
    case SET_ACTIVE_CATEGORY:
      return _.assign({}, state, { activeCategory: action.id });
    default:
      return state;
  }
};
export default layout;
