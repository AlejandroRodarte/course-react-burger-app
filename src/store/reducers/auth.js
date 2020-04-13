import * as types from '../types';

import updateState from '../../utils/functions/store/update-state';

const setAuthLoading = (state) => updateState(state, {
    error: null,
    loading: true
});

const setAuth = (state, action) => updateState(state, {
    error: null,
    loading: false,
    token: action.payload.token,
    userId: action.payload.userId
});

const authFail = (state, action) => updateState(state, {
    error: action.payload.error,
    loading: false
});

const logout = (state) => updateState(state, {
    token: null,
    userId: null
});

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

export default function(state = initialState, action) {

    switch (action.type) {

        case types.SET_AUTH_LOADING:
            return setAuthLoading(state);

        case types.SET_AUTH:
            return setAuth(state, action);

        case types.AUTH_FAIL:
            return authFail(state, action);

        case types.LOGOUT:
            return logout(state);

        default:
            return state;

    }

}
