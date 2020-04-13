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

        const auth = await axios.post(url, {
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
