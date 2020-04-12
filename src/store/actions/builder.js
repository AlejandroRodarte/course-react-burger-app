import * as types from '../types';

import axios from '../../axios/axios-orders';

export const startSetIngredients = () => async (dispatch) => {
    try {
        const { data: ingredients } = await axios.get('/ingredients.json');
        dispatch(setIngredients(ingredients));
    } catch (e) {
        dispatch(fetchIngredientsFail());
    }
};

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
