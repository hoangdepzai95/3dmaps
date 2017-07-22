import { takeLatest, fork, call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { INIT_APP, receiveInitApp, LOGIN_FACEBOOK, receiveLoginFaceBook } from '../actions/auth';
import { changeLoading } from '../actions/layout';
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
    yield put(changeLoading(true));
    if (res.type === 'success') {
      AsyncStorage.setItem('facebook_token', res.token);
      let userInfo = yield call(Api.getUserInfo, res.token);
      userInfo = {
        avatar: userInfo.data.picture.data.url,
        email: userInfo.data.email,
        name: userInfo.data.name,
      };
      // const backendUserInfo = yield call(Api.loginBackend, userInfo);
      yield put(receiveLoginFaceBook(res.token, userInfo));
    }
    yield put(changeLoading(false));
  } catch (e) {
    yield put(changeLoading(false));
  }
}

function* watchLoginFaceBook() {
  yield takeLatest(LOGIN_FACEBOOK, loginFaceBook);
}
export function* auth() {
  yield fork(watchInitApp);
  yield fork(watchLoginFaceBook);
}
