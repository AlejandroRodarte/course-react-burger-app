import * as types from '../types';

import axios from '../../axios/axios-orders';

export const startSetOrders = () => async (dispatch) => {

    try {

        const { data } = await axios.get('/orders.json');

        const orders = [];

        for (const key in data) {
            orders.push({
                id: key,
                ...data[key]
            });
        }

        dispatch(setOrders(orders));

    } catch (e) { throw e; }

};

export const setOrders = (orders) => ({
    type: types.SET_ORDERS,
    payload: {
        orders
    }
});

export const startAddOrder = (order) => async () => await axios.post('/orders.json', order);
