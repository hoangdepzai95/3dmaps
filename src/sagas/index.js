import { fork } from 'redux-saga/effects';

import { auth } from './auth';
import { fetchData } from './fetchData';

export default function* rootSaga() {
  yield fork(auth);
  yield fork(fetchData);
}
