import { createStore, combineReducers, compose } from 'redux';

import builderReducer from './reducers/builder';

const rootReducer = combineReducers({
    builder: builderReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers());

export default store;
