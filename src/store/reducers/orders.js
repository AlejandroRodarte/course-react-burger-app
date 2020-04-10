import * as OrderTypes from '../types/orders';

const initialState = {
    orders: []
};

export default function(state = initialState, action) {

    switch (action.type) {

        case OrderTypes.SET_ORDERS:
            return {
                ...state,
                orders: action.payload.orders
            };

        default:
            return state;

    }

}
