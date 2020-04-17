import { put, call } from 'redux-saga/effects';

import * as builderApi from '../../api/builder';
import * as actions from '../actions';

export function* startSetIngredientsSaga() {

    try {
        const ingredients = yield call(builderApi.getIngredients);
        yield put(actions.setIngredients(ingredients));
    } catch (e) {
        yield put(actions.fetchIngredientsFail());
    }
    
}
