import * as types from '../types';

import updateState from '../../utils/functions/store/update-state';

const setOrders = (state, action) => updateState(state, {
    orders: action.payload.orders,
    loading: false,
    error: null
});

const addOrder = (state, action) => updateState(state, {
    orders: [
        ...state.orders,
        {
            id: action.payload.id,
            ...action.payload.order
        }
    ],
    error: null,
    loading: false
});

const addOrderFail = (state, action) => updateState(state, {
    error: action.payload.error,
    loading: false
});

const setOrdersLoading = (state) => updateState(state, {
    loading: true
});

const setOrdersFail = (state, action) => updateState(state, {
    error: action.payload.error,
    loading: false
});

const initialState = {
    orders: [],
    error: null,
    loading: false
};

export default function(state = initialState, action) {

    switch (action.type) {

        case types.SET_ORDERS:
            return setOrders(state, action);

        case types.ADD_ORDER:
            return addOrder(state, action);

        case types.ADD_ORDER_FAIL:
            return addOrderFail(state, action);

        case types.SET_ORDERS_LOADING:
            return setOrdersLoading(state);

        case types.SET_ORDERS_FAIL:
            return setOrdersFail(state, action);

        default:
            return state;

    }

}
