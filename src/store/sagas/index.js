import { takeEvery, all, spawn, call } from 'redux-saga/effects';

import * as types from '../types';
import { logoutSaga, startLogoutSaga, startSetAuthSaga, autoLoginSaga } from './auth';
import { startSetIngredientsSaga } from './builder';

function* watchAuth() {
    yield takeEvery(types.INIT_LOGOUT, logoutSaga);
    yield takeEvery(types.START_LOGOUT, startLogoutSaga);
    yield takeEvery(types.START_SET_AUTH, startSetAuthSaga);
    yield takeEvery(types.AUTO_LOGIN, autoLoginSaga);
}

function* watchBuilder() {
    yield takeEvery(types.START_SET_INGREDIENTS, startSetIngredientsSaga);
}

export default function*() {

    const sagas = [
        watchAuth,
        watchBuilder
    ];

    yield all(
        sagas.map(
            saga => spawn(
                function*() {
                    while (true) {
                        try {
                            yield call(saga);
                            break;
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
            )
        )
    );

}
