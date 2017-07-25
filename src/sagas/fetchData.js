import { takeLatest, fork, call, put, takeEvery } from 'redux-saga/effects';
import I18n from 'i18n-js';

import {
  GET_HOME_GALLERY,
  receiveHomeGallery,
  GET_EXPERIENCE_CATEGORY,
  receiveExperienceCategory,
  GET_POST,
  receivePost,
  stopLoadingPost,
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
function* getPost(action) {
  try {
    const response = yield call(Api.getPost, action.id, action.page, action.postType);
    yield put(receivePost(action.id, action.page, response.data, action.postType));
  } catch (err) {
    yield put(stopLoadingPost(action.id, action.postType));
  }
}


function* watchGetPost() {
  yield takeEvery(GET_POST, getPost);
}
export function* fetchData() {
  yield fork(watchGetHomeGallery);
  yield fork(watchGetExperienceCategory);
  yield fork(watchGetPost);
}
