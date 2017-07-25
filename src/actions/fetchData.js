export const GET_HOME_GALLERY = 'GET_HOME_GALLERY';
export const RECEIVE_HOME_GALLERY = 'RECEIVE_HOME_GALLERY';
export const GET_EXPERIENCE_CATEGORY = 'GET_EXPERIENCE_CATEGORY';
export const RECEIVE_EXPERIENCE_CATEGORY = 'RECEIVE_EXPERIENCE_CATEGORY';
export const RESET_DATA = 'RESET_DATA';
export const GET_POST = 'GET_GALLERY_POST';
export const RECEIVE_POST = 'RECEIVE_GALLERY_POST';
export const STOP_LOADING_POST = 'STOP_LOADING_POST';

export function getHomeGallery() {
  return {
    type: GET_HOME_GALLERY,
  };
}

export function receiveHomeGallery(galleries) {
  return {
    type: RECEIVE_HOME_GALLERY,
    galleries,
  };
}

export function resetData() {
  return {
    type: RESET_DATA,
  };
}
export function getExperienceCategory() {
  return {
    type: GET_EXPERIENCE_CATEGORY,
  };
}
export function receiveExperienceCategory(categories) {
  return {
    type: RECEIVE_EXPERIENCE_CATEGORY,
    categories,
  };
}

export function getPost(id, page, postType) {
  return {
    type: GET_POST,
    id,
    page,
    postType,
  };
}
export function receivePost(id, page, data, postType) {
  return {
    type: RECEIVE_POST,
    data,
    page,
    id,
    postType,
  };
}
export function stopLoadingPost(id, postType) {
  return {
    type: STOP_LOADING_POST,
    id,
    postType,
  };
}
