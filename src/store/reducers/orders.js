import * as types from '../types';

const initialState = {
    orders: []
};

export default function(state = initialState, action) {

    switch (action.type) {

        case types.SET_ORDERS:
            return {
                ...state,
                orders: action.payload.orders
            };

        default:
            return state;

    }

}
