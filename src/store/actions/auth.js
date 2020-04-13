import * as types from '../types';

import axios from '../../axios/axios-auth';

export const setAuthLoading = () => ({
    type: types.SET_AUTH_LOADING
});

export const startSetAuth = (credentials) => async (dispatch) => {

    dispatch(setAuthLoading());

    try {

        const auth = await axios.post(`:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`, {
            ...credentials,
            returnSecureToken: true
        });

        console.log(auth);

        dispatch(setAuth(auth));

    } catch (e) {
        dispatch(authFail(e));
    }

}

export const setAuth = (auth) => ({
    type: types.SET_AUTH,
    payload: {
        auth
    }
});

export const authFail = (error) => ({
    type: types.AUTH_FAIL,
    payload: {
        error
    }
});
