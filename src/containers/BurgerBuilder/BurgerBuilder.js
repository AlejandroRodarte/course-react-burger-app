import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import * as burgerIngredientTypes from '../../types/burger/burger-ingredient-types';
import burgerIngredientPrices from '../../utils/burger/burger-ingredient-prices';

class BurgerBuilder extends Component {
    
    state = {
        ingredients: {
            [burgerIngredientTypes.SALAD]: 0,
            [burgerIngredientTypes.BACON]: 0,
            [burgerIngredientTypes.CHEESE]: 0,
            [burgerIngredientTypes.MEAT]: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
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
                        totalPrice: prevState.totalPrice + burgerIngredientPrices[type],
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
                        totalPrice: prevState.ingredients[type] <= 0 ? prevState.totalPrice : prevState.totalPrice - burgerIngredientPrices[type],
                        purchaseable: this.getIngredientAmount(prevState.ingredients) - 1 > 0
                    }
                )
        );

    };

    purchaseHandler = () => {
        this.setState(() => ({ purchasing: true }));
    }

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

                <Modal show={ this.state.purchasing }>
                    <OrderSummary ingredients={ this.state.ingredients } />
                </Modal>

                <Burger ingredients={ this.state.ingredients } />

                <BuildControls
                    price={ this.state.totalPrice }
                    ingredientAdded={ this.addIngredientHandler }
                    ingredientRemoved={ this.removeIngredientHandler }
                    disabled={ disabledButtonsInfo }
                    purchaseable={ this.state.purchaseable }
                    ordered={ this.purchaseHandler }
                /> 

            </Fragment>
        );

    }

}

export default BurgerBuilder;
