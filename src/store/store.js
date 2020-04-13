import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

const rootReducer = combineReducers({
    builder: reducers.builderReducer,
    orders: reducers.ordersReducer,
    auth: reducers.authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
