import { takeLatest, fork, call, put } from 'redux-saga/effects';
import I18n from 'i18n-js';

import {
  GET_HOME_GALLERY,
  receiveHomeGallery,
  GET_EXPERIENCE_CATEGORY,
  receiveExperienceCategory,
 } from '../actions/fetchData';
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
function* getExperienceCategory() {
  try {
    const response = yield call(Api.getExperienceCategory);
    yield put(receiveExperienceCategory(response.data));
  } catch (err) {
    alert(I18n.t('NETWORK_ERROR_MESSAGE'));
  }
}


function* watchGetExperienceCategory() {
  yield takeLatest(GET_EXPERIENCE_CATEGORY, getExperienceCategory);
}
export function* fetchData() {
  yield fork(watchGetHomeGallery);
  yield fork(watchGetExperienceCategory);
}
