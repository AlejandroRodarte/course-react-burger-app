import * as BuilderTypes from '../types/builder';

import burgerIngredientPrices from '../../utils/burger/burger-ingredient-prices';

const initialState = {
    ingredients: null,
    totalPrice: 4
};

export default function(state = initialState, action) {

    switch (action.type) {

        case BuilderTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload.ingredients
            };

        case BuilderTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
                },
                totalPrice: state.totalPrice + burgerIngredientPrices[action.payload.ingredientName]
            };

        case BuilderTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] <= 0 ? 0 : state.ingredients[action.payload.ingredientName] - 1
                },
                totalPrice: state.ingredients[action.payload.ingredientName] <= 0 ? state.totalPrice : state.totalPrice - burgerIngredientPrices[action.payload.ingredientName],
            };
    
        case BuilderTypes.CLEAR_BUILDER:

            const newIngredients = { ...state.ingredients };

            for (const ingredientName in newIngredients) {
                newIngredients[ingredientName] = 0;
            }

            return {
                ...state,
                ingredients: newIngredients,
                totalPrice: 4
            };

        default:
            return state;

    }

};
