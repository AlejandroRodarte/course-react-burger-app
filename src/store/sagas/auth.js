import { delay, put, call, select } from 'redux-saga/effects';

import * as actions from '../actions';

import * as authApi from '../../api/auth';

import selectors from '../selectors';

import history from '../../history/history';

export function* logoutSaga() {
    yield call([localStorage, 'removeItem'], 'userData');
    yield put(actions.logout());
    yield call([history, 'replace'], '/builder');
}

export function* startLogoutSaga(action) {
    yield delay(action.payload.expiresIn);
    yield put(actions.initLogout());
}

export function* startSetAuthSaga(action) {

    yield put(actions.setAuthLoading());

    try {

        const data = yield call(authApi.signup, action.payload);
    
        yield put(actions.setAuth(data));
    
        yield put(actions.startLogout(+data.expiresIn * 1000));
    
        const userData = {
            token: data.idToken,
            expirationTime: new Date().getTime() + (+data.expiresIn * 1000),
            userId: data.localId
        };
    
        yield call([localStorage, 'setItem'], 'userData', JSON.stringify(userData));

        const ingredientsAmount = yield select(selectors.getIngredientsAmount);

        if (ingredientsAmount > 0) {
            yield call([history, 'replace'], '/checkout');
        } else {
            yield call([history, 'push'], '/builder');
        }

    } catch (e) {
        yield put(actions.authFail(e.response.data.error));
    }

}

export function* autoLoginSaga() {

    const userData = yield call([localStorage, 'getItem'], 'userData');

    if (!userData) {
        yield put(actions.initLogout());
        return;
    }

    const { 
        token: idToken, 
        expirationTime, 
        userId: localId 
    } = yield call([JSON, 'parse'], userData);
    
    const expiresIn = expirationTime - new Date().getTime();

    if (idToken && expiresIn > 0) {
        yield put(actions.setAuth({ idToken, localId }));
        yield put(actions.startLogout(expiresIn));
    } else {
        yield put(actions.initLogout());
    }

}
