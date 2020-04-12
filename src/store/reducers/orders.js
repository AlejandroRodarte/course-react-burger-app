import * as types from '../types';

import updateState from '../../utils/functions/store/update-state';

const setOrders = (state, action) => updateState(state, {
    orders: action.payload.orders
});

const initialState = {
    orders: []
};

export default function(state = initialState, action) {

    switch (action.type) {

        case types.SET_ORDERS:
            return setOrders(state, action);

        default:
            return state;

    }

}
