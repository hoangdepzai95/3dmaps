import { takeLatest, fork, call, put } from 'redux-saga/effects';
import I18n from 'i18n-js';

import { GET_HOME_GALLERY, receiveHomeGallery } from '../actions/fetchData';
import Api from '../api';
import alert from '../util/alert';

function* getHomeGallery() {
  try {
    const response = yield call(Api.getHomeGallery);
    yield put(receiveHomeGallery(response.data));
  } catch (err) {
    alert(I18n.t('NETWORK_ERROR_MESSAGE'));
  }
}


function* watchGetHomeGallery() {
  yield takeLatest(GET_HOME_GALLERY, getHomeGallery);
}
export function* fetchData() {
  yield fork(watchGetHomeGallery);
}
