import { put } from 'redux-saga/effects';

import * as types from '../types';

export function* logoutSaga(action) {

    yield localStorage.removeItem('userData');

    yield put({
        type: types.LOGOUT
    });

}
