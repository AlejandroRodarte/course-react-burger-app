import * as types from '../types';

import updateState from '../../utils/functions/store/update-state';

const setOrders = (state, action) => updateState(state, {
    orders: action.payload.orders
});

const addOrder = (state, action) => updateState(state, {
    orders: [
        ...state.orders,
        {
            id: action.payload.id,
            ...action.payload.order
        }
    ],
    error: null
});

const addOrderFail = (state, action) => updateState(state, {
    error: action.payload.error
});

const initialState = {
    orders: [],
    error: null
};

export default function(state = initialState, action) {

    switch (action.type) {

        case types.SET_ORDERS:
            return setOrders(state, action);

        case types.ADD_ORDER:
            return addOrder(state, action);

        case types.ADD_ORDER_FAIL:
            return addOrderFail(state, action);

        default:
            return state;

    }

}
