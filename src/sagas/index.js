import { takeEvery, takeLatest } from 'redux-saga';
import { take, put, call, fork, select, cancelled } from 'redux-saga/effects';

import { login } from './login';

export function* rootSaga() {
  yield fork(login);
}
