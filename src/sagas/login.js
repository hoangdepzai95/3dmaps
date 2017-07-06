import { takeLatest } from 'redux-saga';

function* watchResetPassword (){
	yield takeLatest(RESET_PASSWORD, resetPassword );
}

export function* login(){
};
