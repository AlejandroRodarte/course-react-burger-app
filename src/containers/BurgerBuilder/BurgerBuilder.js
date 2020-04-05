import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import * as burgerIngredientTypes from '../../types/burger/burger-ingredient-types';

const INGREDIENT_PRICES = {
    [burgerIngredientTypes.SALAD]: 0.5,
    [burgerIngredientTypes.BACON]: 0.4,
    [burgerIngredientTypes.CHEESE]: 1.3,
    [burgerIngredientTypes.MEAT]: 0.7
};

class BurgerBuilder extends Component {
    
    state = {
        ingredients: {
            [burgerIngredientTypes.SALAD]: 0,
            [burgerIngredientTypes.BACON]: 0,
            [burgerIngredientTypes.CHEESE]: 0,
            [burgerIngredientTypes.MEAT]: 0
        },
        totalPrice: 4,
        purchaseable: false
    };

    addIngredientHandler = (type) => {

        this.setState(
            (prevState) => 
                (
                    { 
                        ingredients: { 
                            ...this.state.ingredients, 
                            [type]: prevState.ingredients[type] + 1
                        },
                        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type],
                        purchaseable: this.getIngredientAmount(prevState.ingredients) + 1 > 0
                    }
                )
        );

    };

    removeIngredientHandler = (type) => {

        this.setState(
            (prevState) => 
                (
                    { 
                        ingredients: { 
                            ...this.state.ingredients, 
                            [type]: prevState.ingredients[type] <= 0 ? 0 : prevState.ingredients[type] - 1
                        },
                        totalPrice: prevState.ingredients[type] <= 0 ? prevState.totalPrice : prevState.totalPrice - INGREDIENT_PRICES[type],
                        purchaseable: this.getIngredientAmount(prevState.ingredients) - 1 > 0
                    }
                )
        );

    };

    getIngredientAmount(ingredients) {
        return Object
                .keys(ingredients)
                .map(ingredientKey => ingredients[ingredientKey])
                .reduce((acc, cv) => acc + cv, 0);
    }

    render() {

        const disabledButtonsInfo = {};

        Object
            .keys(this.state.ingredients)
            .forEach((ingredientKey) => disabledButtonsInfo[ingredientKey] = this.state.ingredients[ingredientKey] <= 0);

        return (
            <Fragment>

                <Burger ingredients={ this.state.ingredients } />

                <BuildControls
                    price={ this.state.totalPrice }
                    ingredientAdded={ this.addIngredientHandler }
                    ingredientRemoved={ this.removeIngredientHandler }
                    disabled={ disabledButtonsInfo }
                    purchaseable={ this.state.purchaseable }
                /> 

            </Fragment>
        );

    }

}

export default BurgerBuilder;
