import * as types from '../types';

import axios from '../../axios/axios-auth';

export const setAuthLoading = () => ({
    type: types.SET_AUTH_LOADING
});

export const startSetAuth = (credentials, isSignUp) => async (dispatch) => {

    dispatch(setAuthLoading());

    try {

        const url = 
            isSignUp ? 
            `:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}` :
            `:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

        const { data } = await axios.post(url, {
            ...credentials,
            returnSecureToken: true
        });

        dispatch(setAuth(data));
        dispatch(startLogout(+data.expiresIn * 1000));

        const userData = {
            token: data.idToken,
            expirationTime: new Date().getTime() + (+data.expiresIn * 1000),
            userId: data.localId
        };

        localStorage.setItem('userData', JSON.stringify(userData));

    } catch (e) {
        dispatch(authFail(e.response.data.error));
        throw e;
    }

}

export const startLogout = (expiresIn) => ({
    type: types.START_LOGOUT,
    payload: {
        expiresIn
    }
});

export const logout = () => ({
    type: types.LOGOUT
});

export const initLogout = () => ({
    type: types.INIT_LOGOUT
});

export const setAuth = ({ idToken, localId }) => ({
    type: types.SET_AUTH,
    payload: {
        token: idToken,
        userId: localId
    }
});

export const authFail = (error) => ({
    type: types.AUTH_FAIL,
    payload: {
        error
    }
});

export const autoLogin = () => async (dispatch) => {

    const userData = localStorage.getItem('userData');

    if (!userData) {
        return;
    }

    const { token: idToken, expirationTime, userId: localId } = JSON.parse(userData);
    
    const expiresIn = expirationTime - new Date().getTime();

    if (idToken && expiresIn > 0) {
        dispatch(setAuth({ idToken, localId }));
        dispatch(startLogout(expiresIn));
    } else {
        dispatch(logout());
    }

};
