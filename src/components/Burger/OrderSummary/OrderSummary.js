import React, { Fragment } from 'react';

import Button from '../../UI/Button/Button';

import burgerIngredientNames from '../../../utils/burger/burger-ingredient-names';

const OrderSummary = ({ ingredients, purchaseCanceled, purchaseContinued, price }) => {

    const ingredientKeyStyles = {
        textTransform: 'capitalize'
    };

    const ingredientSummaryJsx =
        Object
            .keys(ingredients)
            .map(
                (ingredientKey) => 
                    <li key={ ingredientKey }>
                        <span style={ ingredientKeyStyles }>{ burgerIngredientNames[ingredientKey] }</span>: { ingredients[ingredientKey] }
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
                <strong>Total Price: ${ price.toFixed(2) }</strong>
            </p>
            <p>
                Continue to Checkout?
            </p>
            <Button
                clicked={ purchaseCanceled }
                type="Danger"
            >
                CANCEL
            </Button>
            <Button
                clicked={ purchaseContinued }
                type="Success"
            >
                CONTINUE
            </Button>
        </Fragment>
    );

};

export default OrderSummary;
