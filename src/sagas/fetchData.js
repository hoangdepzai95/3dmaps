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
  GET_COMMENTS,
  receiveComments,
  POST_COMMENT,
  receiveComment,
  GET_MAP_POSTS,
  receiveMapPost,
  GET_SAVED,
  receiveSaved,
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
function* getComments(action) {
  try {
    const response = yield call(Api.getComments, action.postId, action.postType, action.page);
    yield put(receiveComments(response.data, action.page));
  } catch (err) {
  }
}


function* watchGetComments() {
  yield takeEvery(GET_COMMENTS, getComments);
}
function* postComment(action) {
  try {
    const response = yield call(
      Api.postComment,
      action.userId,
      action.postType,
      action.postId,
      action.content,
    );
    yield put(receiveComment(response.data));
  } catch (err) {
  }
}

function* watchPostComment() {
  yield takeLatest(POST_COMMENT, postComment);
}
function* getMapPosts(action) {
  try {
    const response = yield call(Api.getMapPosts);
    yield put(receiveMapPost(response.data));
  } catch (err) {
  }
}

function* watchGetMapPosts() {
  yield takeLatest(GET_MAP_POSTS, getMapPosts);
}
function* getSaved(action) {
  try {
    const response = yield call(Api.getSaved, 1);
    console.log(response);
    yield put(receiveSaved(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* watchGetsaved() {
  yield takeLatest(GET_SAVED, getSaved);
}
export function* fetchData() {
  yield fork(watchGetHomeGallery);
  yield fork(watchGetExperienceCategory);
  yield fork(watchGetPost);
  yield fork(watchGetComments);
  yield fork(watchPostComment);
  yield fork(watchGetMapPosts);
  yield fork(watchGetsaved);
}
