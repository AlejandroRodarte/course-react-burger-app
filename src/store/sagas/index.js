import { takeEvery } from 'redux-saga/effects';

import * as types from '../types';
import { logoutSaga, startLogoutSaga, startSetAuthSaga } from './auth';

export function* watchAuth() {
    yield takeEvery(types.INIT_LOGOUT, logoutSaga);
    yield takeEvery(types.START_LOGOUT, startLogoutSaga);
    yield takeEvery(types.START_SET_AUTH, startSetAuthSaga)
}
