import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

import * as actions from '../actions';

export function* logoutSaga(action) {
    yield localStorage.removeItem('userData');
    yield put(actions.logout());
}

export function* startLogoutSaga(action) {
    yield delay(action.payload.expiresIn);
    yield put(actions.initLogout());
}
