import * as types from '../types';

export const setBuilderLoading = () => ({
    type: types.SET_BUILDER_LOADING
});

export const startSetIngredients = () => ({
    type: types.START_SET_INGREDIENTS
});

export const fetchIngredientsFail = () => ({
    type: types.FETCH_INGREDIENTS_FAIL
});

export const setIngredients = (ingredients) => ({
    type: types.SET_INGREDIENTS,
    payload: {
        ingredients
    }
});

export const addIngredient = (ingredientName) => ({
    type: types.ADD_INGREDIENT,
    payload: {
        ingredientName
    }
});

export const removeIngredient = (ingredientName) => ({
    type: types.REMOVE_INGREDIENT,
    payload: {
        ingredientName
    }
});

export const clearBuilder = () => ({
    type: types.CLEAR_BUILDER
});
