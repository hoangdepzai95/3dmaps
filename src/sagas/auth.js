import { takeLatest, fork, call, put } from 'redux-saga/effects';

import { CHECK_LOGIN, receiveCheckLogin } from '../actions/auth';
import Api from '../api';

function* checkLogin (action) {
  try {
	  const response = yield call(Api.checkLogin);
    yield put(receiveCheckLogin(...response));
	} catch (err) {
		console.log(err);
	}
}

function* watchCheckLogin (){
  yield takeLatest(CHECK_LOGIN, checkLogin);
}

export function* auth() {
  yield fork(watchCheckLogin);
};
