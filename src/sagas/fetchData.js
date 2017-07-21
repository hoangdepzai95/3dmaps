import { takeLatest, fork, call, put } from 'redux-saga/effects';

import { GET_HOME_GALLERY, receiveHomeGallery } from '../actions/fetchData';
import Api from '../api';

function* getHomeGallery() {
  try {
    const response = yield call(Api.getHomeGallery);
    yield put(receiveHomeGallery(response.data));
  } catch (err) {
    console.log(err);
  }
}


function* watchGetHomeGallery() {
  yield takeLatest(GET_HOME_GALLERY, getHomeGallery);
}
export function* fetchData() {
  yield fork(watchGetHomeGallery);
}
