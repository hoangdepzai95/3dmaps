import { takeLatest, fork, call, put, takeEvery } from 'redux-saga/effects';
import I18n from 'i18n-js';

import {
  GET_HOME_GALLERY,
  receiveHomeGallery,
  GET_EXPERIENCE_CATEGORY,
  receiveExperienceCategory,
  GET_GALLERY_POST,
  receiveGalleryPost,
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
function* getGalleryPost(action) {
  try {
    const response = yield call(Api.getGalleryPost, action.id, action.page);
    console.log(response);
    yield put(receiveGalleryPost(action.id, action.page, response.data));
  } catch (err) {
    alert(I18n.t('NETWORK_ERROR_MESSAGE'));
  }
}


function* watchGetGalleryPost() {
  yield takeEvery(GET_GALLERY_POST, getGalleryPost);
}
export function* fetchData() {
  yield fork(watchGetHomeGallery);
  yield fork(watchGetExperienceCategory);
  yield fork(watchGetGalleryPost);
}
