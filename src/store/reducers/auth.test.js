import * as types from '../types';

import authReducer from './auth';

describe('authReducer', () => {

    it('Should return the initial state', () => {

        const actionObject = {
            type: 'auth/unknownAction'
        };

        expect(authReducer(undefined, actionObject)).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false
        });

    });

    it('Should store the token upon login/signup', () => {

        const token = 'my-token';
        const userId = 'user-id';

        const actionObject = {
            type: types.SET_AUTH,
            payload: {
                token,
                userId
            }
        };

        expect(authReducer(undefined, actionObject)).toEqual({
            error: null,
            loading: false,
            token,
            userId
        });

    });

});
