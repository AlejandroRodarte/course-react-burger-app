import * as BuilderTypes from '../types/builder';

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
