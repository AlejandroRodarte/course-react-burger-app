import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Button from '../../UI/Button/Button';

import burgerIngredientNames from '../../../utils/burger/burger-ingredient-names';

const OrderSummary = ({ ingredients, price, purchaseCanceled, purchaseContinued }) => {

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

const mapStateToProps = state => ({
    ingredients: state.builder.ingredients,
    price: state.builder.totalPrice
});

export default connect(mapStateToProps, undefined)(OrderSummary);
