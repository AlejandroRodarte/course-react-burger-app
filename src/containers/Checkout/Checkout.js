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

                <CheckoutRouter />

            </div>
        );

        if (!this.props.hasIngredients) {
            jsx = <Redirect to="/builder" />;
        }

        return jsx;

    }

}

const mapStateToProps = state => ({
    hasIngredients: Object.keys(state.builder.ingredients).length > 0
});

export default connect(mapStateToProps, undefined)(Checkout);