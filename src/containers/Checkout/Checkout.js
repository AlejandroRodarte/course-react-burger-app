import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckoutRouter from '../../routes/Checkout/CheckoutRouter';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    checkoutCancelledHandler = () => this.props.history.goBack();

    checkoutContinuedHandler = () => this.props.history.replace('/checkout/contact-data');

    render() {
        return (
            <div>

                <CheckoutSummary 
                    ingredients={ this.props.ingredients }
                    checkoutCancelled={ this.checkoutCancelledHandler }
                    checkoutContinued={ this.checkoutContinuedHandler }
                />

                <CheckoutRouter 
                    ingredients={ this.props.ingredients }
                    price={ this.props.totalPrice }
                />

            </div>
        );
    }

}

const mapStateToProps = state => ({
    ingredients: state.builder.ingredients,
    totalPrice: state.builder.totalPrice
});

export default connect(mapStateToProps, undefined)(Checkout);