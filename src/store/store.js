import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import builderReducer from './reducers/builder';
import ordersReducer from './reducers/orders';

const rootReducer = combineReducers({
    builder: builderReducer,
    orders: ordersReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
