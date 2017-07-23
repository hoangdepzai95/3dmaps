import { takeLatest, fork, call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import I18n from 'i18n-js';

import {
  INIT_APP,
  receiveInitApp,
  LOGIN_FACEBOOK,
  receiveLoginFaceBook,
  receiveUserInfo,
} from '../actions/auth';
import { changeLoading } from '../actions/layout';
import Api from '../api';
import alert from '../util/alert';

function* initApp() {
  try {
    const response = yield call(Api.initApp);
    const userId = response[4];
    if (userId) {
      const userInfo = yield call(Api.getUserBackendInfo, response[4]);
      yield put(receiveUserInfo(userInfo.data[0]));
    }
    yield put(receiveInitApp(...response));
  } catch (err) {
    yield put(receiveInitApp());
    alert(I18n.t('NETWORK_ERROR_MESSAGE'));
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
      const backendUserInfo = yield call(Api.loginBackend, userInfo);
      yield put(receiveUserInfo(backendUserInfo.data));
      AsyncStorage.setItem('user_id', String(backendUserInfo.data.id));
      yield put(receiveLoginFaceBook(res.token));
    }
    yield put(changeLoading(false));
  } catch (e) {
    yield put(changeLoading(false));
    alert(I18n.t('NETWORK_ERROR_MESSAGE'));
  }
}

function* watchLoginFaceBook() {
  yield takeLatest(LOGIN_FACEBOOK, loginFaceBook);
}
export function* auth() {
  yield fork(watchInitApp);
  yield fork(watchLoginFaceBook);
}
