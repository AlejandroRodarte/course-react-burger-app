import getIngredientsAmount from '../utils/functions/burger-builder/get-ingredients-amount';

export default {
    getIngredientsAmount: (state) => getIngredientsAmount(state.builder.ingredients)
}
