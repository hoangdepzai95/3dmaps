import { takeLatest, fork, call, put } from 'redux-saga/effects';

import { INIT_APP, receiveInitApp } from '../actions/auth';
import Api from '../api';

function* initApp () {
  try {
	  const response = yield call(Api.initApp);
    yield put(receiveInitApp(...response));
	} catch (err) {
		console.log(err);
	}
}

function* watchInitApp (){
  yield takeLatest(INIT_APP, initApp);
}

export function* auth() {
  yield fork(watchInitApp);
};
