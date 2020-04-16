import { put } from 'redux-saga/effects';

import * as types from '../types';

function* logout(action) {

    yield localStorage.removeItem('userData');

    yield put({
        type: types.LOGOUT
    });

}
