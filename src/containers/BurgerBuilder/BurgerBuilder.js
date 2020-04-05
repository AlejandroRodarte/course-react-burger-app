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
        totalPrice: 4
    };

    addIngredientHandler = 
        (type) => 
            this.setState(
                (prevState) => 
                (
                    { 
                        ingredients: { 
                            ...this.state.ingredients, 
                            [type]: prevState.ingredients[type] + 1
                        },
                        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
                    }
                )
            );

    removeIngredientHandler = (type) => {

    };

    render() {
        return (
            <Fragment>
                <Burger ingredients={ this.state.ingredients } />
                <BuildControls ingredientAdded={ this.addIngredientHandler } /> 
            </Fragment>
        );
    }

}

export default BurgerBuilder;
