export const GET_HOME_GALLERY = 'GET_HOME_GALLERY';
export const RECEIVE_HOME_GALLERY = 'RECEIVE_HOME_GALLERY';

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
