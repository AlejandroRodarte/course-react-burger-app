import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { watchAuth } from './sagas';

import * as reducers from './reducers';

const rootReducer = combineReducers({
    builder: reducers.builderReducer,
    orders: reducers.ordersReducer,
    auth: reducers.authReducer
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(
    rootReducer, 
    composeEnhancers(
        applyMiddleware(thunk, sagaMiddleware)
    )
);

sagaMiddleware.run(watchAuth);

export default store;
