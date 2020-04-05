import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import * as burgerIngredientTypes from '../../types/burger/burger-ingredient-types';

class BurgerBuilder extends Component {
    
    state = {
        ingredients: {
            [burgerIngredientTypes.SALAD]: 1,
            [burgerIngredientTypes.BACON]: 1,
            [burgerIngredientTypes.CHEESE]: 2,
            [burgerIngredientTypes.MEAT]: 2
        }
    };

    render() {
        return (
            <Fragment>
                <Burger ingredients={ this.state.ingredients } />
                <BuildControls /> 
            </Fragment>
        );
    }

}

export default BurgerBuilder;
