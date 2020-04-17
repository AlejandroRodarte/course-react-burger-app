import * as types from '../types';

export const setAuthLoading = () => ({
    type: types.SET_AUTH_LOADING
});

export const startSetAuth = (credentials, isSignUp) => ({
    type: types.START_SET_AUTH,
    payload: {
        credentials,
        isSignUp
    }
});

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
