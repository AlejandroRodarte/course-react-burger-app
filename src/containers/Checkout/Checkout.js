import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CheckoutRouter from '../../routes/Checkout/CheckoutRouter';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    checkoutCancelledHandler = () => this.props.history.goBack();

    checkoutContinuedHandler = () => this.props.history.replace('/checkout/contact-data');

    render() {

        let jsx = (
            <div>

                <CheckoutSummary 
                    checkoutCancelled={ this.checkoutCancelledHandler }
                    checkoutContinued={ this.checkoutContinuedHandler }
                />

                <CheckoutRouter 
                    ingredients={ this.props.ingredients }
                    price={ this.props.totalPrice }
                />

            </div>
        );

        if (!this.props.hasIngredients) {
            jsx = <Redirect to="/builder" />;
        }

        return jsx;

    }

}

const mapStateToProps = state => ({
    ingredients: state.builder.ingredients,
    totalPrice: state.builder.totalPrice,
    hasIngredients: !!state.builder.ingredients
});

export default connect(mapStateToProps, undefined)(Checkout);