import _ from 'lodash';
import { RECEIVE_HOME_GALLERY, RESET_DATA } from '../actions/fetchData';

const initialState = {
  home: [],
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_HOME_GALLERY:
      action.galleries.map((gallery) => {
        gallery.posts.map((post) => {
          post.formatedAddress = [
            post.address.detail,
            post.address.district.name,
            post.address.city.name,
          ].join(', ');
          return post;
        });
        return gallery;
      });
      return _.assign({}, state, { home: action.galleries });
    case RESET_DATA:
      return initialState;
    default:
      return state;
  }
};
export default data;
