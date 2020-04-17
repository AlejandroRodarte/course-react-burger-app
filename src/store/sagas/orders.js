import { put, call } from 'redux-saga/effects';

import history from '../../history/history';

import * as ordersApi from '../../api/orders';

import * as actions from '../actions';

export function* startSetOrdersSaga(action) {

    yield put(actions.setOrdersLoading());

    try {
        const orders = yield call(ordersApi.getOrders, action.payload);
        yield put(actions.setOrders(orders));
    } catch (e) {
        yield put(actions.setOrdersFail(e));
    }

}

export function* startAddOrderSaga(action) {

    yield put(actions.setOrdersLoading());

    try {

        const data = yield call(ordersApi.addOrder, action.payload);
        yield put(actions.addOrder(data.name, action.payload.order));

        yield put(actions.clearBuilder());

        yield call([history, 'replace'], '/builder');

    } catch (e) {
        yield put(actions.addOrderFail(e));
    }

}
