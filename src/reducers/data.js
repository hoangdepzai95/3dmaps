import _ from 'lodash';
import {
  RECEIVE_HOME_GALLERY,
  RESET_DATA,
  RECEIVE_EXPERIENCE_CATEGORY,
  RECEIVE_POST,
  GET_POST,
  STOP_LOADING_POST,
} from '../actions/fetchData';
import { PER_PAGE } from '../config';

const initialState = {
  home: { loaded: false, data: [] },
  experience: { loaded: false, data: [] },
  map: { loaded: false, data: [] },
  postsData: {
    gallery: {},
    category: {},
    savedContent: {},
  },
};

function formatPosts(posts, isExperience) {
  return posts.map((post) => {
    post.formatedAddress = [
      post.address.detail,
      post.address.district.name,
      post.address.city.name,
    ].filter(o => _.trim(o)).join(', ');
    if (isExperience) post.seo.featured_image = `http://staging.3dmaps.vn${post.seo.featured_image}`;
    return post;
  });
}
function formatPostData(galleries, isExperience) {
  const field = isExperience ? 'experiences' : 'posts';
  let postsData = {};
  let rs = galleries.filter(gallery => gallery[field].length);
  rs = rs.map((gallery) => {
    gallery[field] = formatPosts(gallery[field], isExperience);
    postsData[gallery.id] = {
      currentPage: 1,
      loading: false,
      data: gallery[field],
      hasMore: gallery[field].length >= PER_PAGE,
    };
    return gallery;
  });
  return { rs, postsData };
}
const data = (state = initialState, action) => {
  const postsData = _.clone(state.postsData);
  switch (action.type) {
    case RECEIVE_HOME_GALLERY: {
      const homeData = formatPostData(action.galleries);
      postsData.gallery = homeData.postsData;
      return _.assign({}, state,
        {
          home: { loaded: true, data: homeData.rs },
          postsData,
        },
      );
    }
    case RESET_DATA:
      return initialState;
    case RECEIVE_EXPERIENCE_CATEGORY: {
      const experienceData = formatPostData(action.categories, true);
      postsData.category = experienceData.postsData;
      return _.assign({}, state,
        {
          experience: { loaded: true, data: experienceData.rs },
          postsData,
        },
      );
    }
    case GET_POST: {
      postsData[action.postType][action.id].loading = true;
      return _.assign({}, state, { postsData });
    }
    case RECEIVE_POST: {
      const target = postsData[action.postType][action.id];
      target.loading = false;
      target.data = [...target.data, ...formatPosts(action.data)];
      target.currentPage = action.page;
      if (!action.data.length) target.hasMore = false;
      return _.assign({}, state, { postsData });
    }
    case STOP_LOADING_POST:
      postsData[action.postType][action.id].loading = false;
      return _.assign({}, state, { postsData });
    default:
      return state;
  }
};
export default data;
