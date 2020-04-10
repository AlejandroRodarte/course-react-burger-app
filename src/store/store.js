import { createStore, combineReducers, compose } from 'redux';

import builderReducer from './reducers/builder';
import ordersReducer from './reducers/orders';

const rootReducer = combineReducers({
    builder: builderReducer,
    orders: ordersReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers());

export default store;
