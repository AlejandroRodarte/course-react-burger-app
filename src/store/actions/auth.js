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
        dispatch(startLogout(+data.expiresIn));

    } catch (e) {
        dispatch(authFail(e.response.data.error));
        throw e;
    }

}

export const startLogout = (expiresIn) => (dispatch) => setTimeout(() => dispatch(logout()), expiresIn * 1000);

export const logout = () => ({
    type: types.LOGOUT
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
