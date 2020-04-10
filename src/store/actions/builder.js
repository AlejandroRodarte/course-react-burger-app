import * as BuilderTypes from '../types/builder';

import axios from '../../axios/axios-orders';

export const startSetIngredients = () => async (dispatch) => {
    try {
        const { data: ingredients } = await axios.get('/ingredients.json');
        dispatch(setIngredients(ingredients));
    } catch (e) { throw e; }
};

export const setIngredients = (ingredients) => ({
    type: BuilderTypes.SET_INGREDIENTS,
    payload: {
        ingredients
    }
});

export const addIngredient = (ingredientName) => ({
    type: BuilderTypes.ADD_INGREDIENT,
    payload: {
        ingredientName
    }
});

export const removeIngredient = (ingredientName) => ({
    type: BuilderTypes.REMOVE_INGREDIENT,
    payload: {
        ingredientName
    }
});

export const clearBuilder = () => ({
    type: BuilderTypes.CLEAR_BUILDER
});
