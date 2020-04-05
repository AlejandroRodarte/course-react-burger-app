import React, { Fragment } from 'react';

import burgerIngredientNames from '../../../utils/burger/burger-ingredient-names';

const OrderSummary = ({ ingredients }) => {

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
                Continue to Checkout?
            </p>
        </Fragment>
    );

};

export default OrderSummary;
