import { takeEvery } from 'redux-saga/effects';

import * as types from '../types';
import { logoutSaga } from './auth';

export function* watchAuth() {
    yield takeEvery(types.INIT_LOGOUT, logoutSaga);
}
