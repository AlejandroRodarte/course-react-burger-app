import * as types from '../types';

import burgerIngredientPrices from '../../utils/burger/burger-ingredient-prices';

import updateState from '../../utils/functions/store/update-state';

const setBuilderLoading = (state) => updateState(state, {
    loading: true
});

const setIngredients = (state, action) => updateState(state, {
    ingredients: action.payload.ingredients,
    error: false,
    loading: false
});

const addIngredient = (state, action) => updateState(state, {
    ingredients: updateState(state.ingredients, {
        [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
    }),
    totalPrice: state.totalPrice + burgerIngredientPrices[action.payload.ingredientName]
});

const removeIngredient = (state, action) => updateState(state, {
    ingredients: updateState(state.ingredients, {
        [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] <= 0 ? 0 : state.ingredients[action.payload.ingredientName] - 1
    }),
    totalPrice: state.ingredients[action.payload.ingredientName] <= 0 ? state.totalPrice : state.totalPrice - burgerIngredientPrices[action.payload.ingredientName]
});

const clearBuilder = (state) => {

    const newIngredients = { ...state.ingredients };

    for (const ingredientName in newIngredients) {
        newIngredients[ingredientName] = 0;
    }

    return updateState(state, {
        ingredients: newIngredients,
        totalPrice: 4
    });

};

const fetchIngredientsFail = (state) => updateState(state, {
    error: true
});

const initialState = {
    ingredients: {},
    totalPrice: 4,
    error: false,
    loading: false
};

export default function(state = initialState, action) {

    switch (action.type) {

        case types.SET_BUILDER_LOADING:
            return setBuilderLoading(state);

        case types.SET_INGREDIENTS:
            return setIngredients(state, action);

        case types.ADD_INGREDIENT:
            return addIngredient(state, action);

        case types.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
    
        case types.CLEAR_BUILDER:
            return clearBuilder(state);

        case types.FETCH_INGREDIENTS_FAIL:
            return fetchIngredientsFail(state);

        default:
            return state;

    }

};
