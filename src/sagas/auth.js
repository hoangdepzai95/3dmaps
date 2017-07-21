import { takeLatest, fork, call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { INIT_APP, receiveInitApp, LOGIN_FACEBOOK, receiveLoginFaceBook } from '../actions/auth';
import Api from '../api';

function* initApp() {
  try {
    const response = yield call(Api.initApp);
    yield put(receiveInitApp(...response));
  } catch (err) {
    console.log(err);
  }
}

function* watchInitApp() {
  yield takeLatest(INIT_APP, initApp);
}

function* loginFaceBook() {
  try {
    const res = yield call(Api.loginFaceBook);
    if (res.type === 'success') {
      AsyncStorage.setItem('facebook_token', res.token);
      yield put(receiveLoginFaceBook(res.token));
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchLoginFaceBook() {
  yield takeLatest(LOGIN_FACEBOOK, loginFaceBook);
}
export function* auth() {
  yield fork(watchInitApp);
  yield fork(watchLoginFaceBook);
}
