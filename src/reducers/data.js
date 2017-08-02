import _ from 'lodash';
import {
  RECEIVE_HOME_GALLERY,
  RESET_DATA,
  RECEIVE_EXPERIENCE_CATEGORY,
  RECEIVE_POST,
  GET_POST,
  STOP_LOADING_POST,
  GET_COMMENTS,
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
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
  comments: {
    data: [],
    currentPage: 0,
    hasMore: true,
    loading: false,
  },
};

function stripIframeUrl(value) {
  if (!value) return '';
  const source = value.split(' ').find(o => o.indexOf('https://my.matterport.com/show/?m=') !== -1);
  return source.slice(5, source.length - 1);
}
function getImages(images) {
  if (!Array.isArray(images)) return [];
  return images.map((image) => {
    let v = String(10000000000 + image.id);
    v = v.slice(1);
    image.url = `http://maapvn.com/admin/images/post/IMG${v}.jpeg?1494409196`;
    return image;
  });
}
function formatPosts(posts, isExperience) {
  return posts.map((post) => {
    post.formatedAddress = [
      post.address.detail,
      post.address.district.name,
      post.address.city.name,
    ].filter(o => _.trim(o)).join(', ');
    post.images = getImages(post.images);
    if (!isExperience) post.formatedUrl = stripIframeUrl(post.matterport_url);
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
    case RECEIVE_COMMENTS: {
      const comments = _.clone(state.comments);
      comments.currentPage = action.page;
      comments.data = [...comments.data, ...action.data];
      comments.hasMore = !!action.data.length;
      comments.loading = false;
      return _.assign({}, state, { comments });
    }
    case RECEIVE_COMMENT: {
      const comments = _.clone(state.comments);
      comments.data = [action.comment, ...comments.data];
      return _.assign({}, state, { comments });
    }
    case GET_COMMENTS: {
      if (action.page === 1) {
        return _.assign({}, state,
          {
            comments: {
              data: [],
              currentPage: 0,
              hasMore: true,
              loading: true,
            },
          },
        );
      }
      return state;
    }
    default:
      return state;

  }
};
export default data;
