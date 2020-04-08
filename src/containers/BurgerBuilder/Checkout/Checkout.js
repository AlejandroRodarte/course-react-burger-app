import React, { Component } from 'react';

import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary';

import * as burgerIngredientTypes from '../../../types/burger/burger-ingredient-types';

class Checkout extends Component {

    state = {
        ingredients: {
            [burgerIngredientTypes.SALAD]: 1, 
            [burgerIngredientTypes.BACON]: 1,
            [burgerIngredientTypes.MEAT]: 1,
            [burgerIngredientTypes.CHEESE]: 1
        }
    }

    checkoutCancelledHandler = () => this.props.history.goBack();

    checkoutContinuedHandler = () => this.props.history.replace('/checkout/contact-data');

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={ this.state.ingredients }
                    checkoutCancelled={ this.checkoutCancelledHandler }
                    checkoutContinued={ this.checkoutContinuedHandler }
                />
            </div>
        );
    }

}

export default Checkout;