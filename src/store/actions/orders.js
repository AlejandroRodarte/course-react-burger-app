import * as types from '../types';

export const startSetOrders = (token, userId) => ({
    type: types.START_SET_ORDERS,
    payload: {
        token,
        userId
    }
});

export const setOrders = (orders) => ({
    type: types.SET_ORDERS,
    payload: {
        orders
    }
});

export const startAddOrder = (order, token) => ({
    type: types.START_ADD_ORDER,
    payload: {
        order,
        token
    }
});

export const addOrder = (id, order) => ({
    type: types.ADD_ORDER,
    payload: {
        id,
        order
    }
});

export const addOrderFail = (error) => ({
    type: types.ADD_ORDER_FAIL,
    payload: {
        error
    }
});

export const setOrdersLoading = () => ({
    type: types.SET_ORDERS_LOADING
});

export const setOrdersFail = (error) => ({
    type: types.SET_ORDERS_FAIL,
    payload: {
        error
    }
});
