import { createStore, combineReducers } from 'redux';

import builderReducer from './reducers/builder';

const rootReducer = combineReducers({
    builder: builderReducer
});

const store = createStore(rootReducer);

export default store;
