import { take, fork, cancel, call } from 'redux-saga/effects';

import * as types from '../types';
import { logoutSaga, startLogoutSaga, startSetAuthSaga, autoLoginSaga } from './auth';

export function* authFlow() {

    let autoLogin = false;

    // endless loop
    while (true) {

        // auto login code: executed once during app lifecycle
        if (!autoLogin) {

            // wait for auth/autoLogin to be dispatched
            yield take(types.AUTO_LOGIN);

            // non-blocking call to autoLoginSaga
            const autoLoginTask = yield fork(autoLoginSaga);

            // autoLoginSaga can put() multiple actions, but two are enough to handle all possible situations
            // 1. auth/startLogout: user had valid credentials in localStorage so an action to start the timer was dispatched
            // 2. autn/initLogout: user had invalid credentials or none at all
            const takenAction = yield take([types.START_LOGOUT, types.INIT_LOGOUT]);

            switch (takenAction.type) {

                // valid credentials
                case types.START_LOGOUT:

                    // non-blocking call to startLogoutSaga to actually dispatch the auto-logout timer
                    const startLogoutTask = yield fork(startLogoutSaga, takenAction);

                    // wait for auth/initLogout to be called (either by user logging out voluntarily or startLogoutSaga delay timer to expire)
                    yield take(types.INIT_LOGOUT);

                    // blocking call to logoutSaga to clear localStorage and auth data in store
                    yield call(logoutSaga);

                    // cancel non-blocking tasks
                    yield cancel(startLogoutTask);
                    yield cancel(autoLoginTask);

                    // set autoLogin flag to never run this code again if webapp hasn't refreshed
                    autoLogin = true;

                    // skip to next while loop
                    continue;

                // invalid credentials
                case types.INIT_LOGOUT:

                    // cancel non-blocking tasks
                    yield cancel(autoLoginTask);

                    // set autoLogin flag to never run this code again if webapp hasn't refreshed
                    autoLogin = true;

                    break;

                default:
                    break;

            }

        }

        // autoLogin process has been executed
        // regardless of result, now we wait for user to enter credentials manually and dispatch auth/startSetAuth
        const startSetAuthAction = yield take(types.START_SET_AUTH);

        // non-bloking call to startSetAuthSaga
        const startSetAuthTask = yield fork(startSetAuthSaga, startSetAuthAction);

        // two possible outcomes while startSetAuthSaga runs
        // 1. auth/startLogout: correct credentials, action was dispatched to set a logout timer
        // 2. autn/initLogout: incorrect credentials
        const takenAction = yield take([types.START_LOGOUT, types.AUTH_FAIL]);

        switch (takenAction.type) {

            // correct credentials
            case types.START_LOGOUT:
            
                // non-blocking call to startLogoutSaga to set timer
                const startLogoutTask = yield fork(startLogoutSaga, takenAction);

                // wait for auth/initLogout to be called
                yield take(types.INIT_LOGOUT);

                // blocking call to logoutSaga to clear localStorage/state
                yield call(logoutSaga);

                // cancel non-blocking tasks
                yield cancel(startLogoutTask);

                break;

            // incorrect credentials
            case types.AUTH_FAIL:
                // cancel non-blocking tasks
                yield cancel(startSetAuthTask);
                break;

            default:
                break;
                
        }

    }

}
