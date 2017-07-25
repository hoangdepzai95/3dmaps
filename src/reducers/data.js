import _ from 'lodash';
import { RECEIVE_HOME_GALLERY, RESET_DATA, RECEIVE_EXPERIENCE_CATEGORY } from '../actions/fetchData';

const initialState = {
  home: { loaded: false, data: [] },
  experience: { loaded: false, data: [] },
  map: { loaded: false, data: [] },
  galleries: {},
  categories: {},
};

function formatPostData(galleries, isExperience) {
  const field = isExperience ? 'experiences' : 'posts';
  let postsData = {};
  let rs = galleries.filter(gallery => gallery[field].length);
  rs = rs.map((gallery) => {
    gallery[field].map((post) => {
      post.formatedAddress = [
        post.address.detail,
        post.address.district.name,
        post.address.city.name,
      ].join(', ');
      if (isExperience) post.seo.featured_image = `http://staging.3dmaps.vn${post.seo.featured_image}`;
      return post;
    });
    postsData[gallery.id] = gallery[field];
    return gallery;
  });
  return {rs, postsData};
}

const data = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_HOME_GALLERY:
      const homeData = formatPostData(action.galleries);
      return _.assign({}, state,
        {
          home: { loaded: true, data: homeData.rs },
          galleries: homeData.postsData,
        },
      );
    case RESET_DATA:
      return initialState;
    case RECEIVE_EXPERIENCE_CATEGORY:
      const experienceData = formatPostData(action.categories, true);
      return _.assign({}, state,
        { experience: { loaded: true, data: experienceData.rs } },
        categories: experienceData.postsData,
      );
    default:
      return state;
  }
};
export default data;
