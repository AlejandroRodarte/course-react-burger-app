import * as types from '../types';

import axios from '../../axios/axios-orders';

export const startSetOrders = (token) => async (dispatch) => {

    try {

        dispatch(setOrdersLoading());

        const { data } = await axios.get(`/orders.json?auth=${token}`);

        const orders = [];

        for (const key in data) {
            orders.push({
                id: key,
                ...data[key]
            });
        }

        dispatch(setOrders(orders));

    } catch (e) {
        dispatch(setOrdersFail(e));
    }

};

export const setOrders = (orders) => ({
    type: types.SET_ORDERS,
    payload: {
        orders
    }
});

export const startAddOrder = (order, token) => async (dispatch) => {
    try {
        dispatch(setOrdersLoading());
        const { data } = await axios.post(`/orders.json?auth=${token}`, order);
        dispatch(addOrder(data.name, order));
    } catch (e) {
        dispatch(addOrderFail(e));
        throw e;
    }
}

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
