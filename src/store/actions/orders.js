import * as OrderTypes from '../types/orders';

export const setOrders = (orders) => ({
    type: OrderTypes.SET_ORDERS,
    payload: {
        orders
    }
});
