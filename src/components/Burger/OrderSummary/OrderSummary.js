import React, { Fragment, Component } from 'react';

import Button from '../../UI/Button/Button';

import burgerIngredientNames from '../../../utils/burger/burger-ingredient-names';

class OrderSummary extends Component {
    
    componentDidUpdate() {
        console.log('[OrderSummary] componentDidUpdate');
    }

    render() {

        const ingredientKeyStyles = {
            textTransform: 'capitalize'
        };
    
        const ingredientSummaryJsx =
            Object
                .keys(this.props.ingredients)
                .map(
                    (ingredientKey) => 
                        <li key={ ingredientKey }>
                            <span style={ ingredientKeyStyles }>{ burgerIngredientNames[ingredientKey] }</span>: { this.props.ingredients[ingredientKey] }
                        </li>
                );
    
        return (
            <Fragment>
                <h3>
                    Your Order
                </h3>
                <p>
                    A delicious burger with the following ingredients
                </p>
                <ul>
                    { ingredientSummaryJsx }
                </ul>
                <p>
                    <strong>Total Price: ${ this.props.price.toFixed(2) }</strong>
                </p>
                <p>
                    Continue to Checkout?
                </p>
                <Button
                    clicked={ this.props.purchaseCanceled }
                    type="Danger"
                >
                    CANCEL
                </Button>
                <Button
                    clicked={ this.props.purchaseContinued }
                    type="Success"
                >
                    CONTINUE
                </Button>
            </Fragment>
        );

    }

}

export default OrderSummary;
