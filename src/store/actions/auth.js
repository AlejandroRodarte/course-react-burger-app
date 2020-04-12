import * as types from '../types';

export const setAuthLoading = () => ({
    type: types.SET_AUTH_LOADING
});

export const startSetAuth = (credentials) => (dispatch) => {
    console.log(credentials);
    dispatch(setAuthLoading());
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
