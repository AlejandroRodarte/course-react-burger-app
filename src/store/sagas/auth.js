import { delay, put, call, select } from 'redux-saga/effects';

import * as actions from '../actions';

import * as authApi from '../../api/auth';

import selectors from '../selectors';

import history from '../../history/history';

export function* logoutSaga(action) {
    yield localStorage.removeItem('userData');
    yield put(actions.logout());
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
    
        yield localStorage.setItem('userData', JSON.stringify(userData));

        const ingredientsAmount = yield select(selectors.getIngredientsAmount);

        if (ingredientsAmount > 0) {
            history.replace('/checkout');
        } else {
            history.push('/builder');
        }

    } catch (e) {
        yield put(actions.authFail(e.response.data.error));
    }

}
