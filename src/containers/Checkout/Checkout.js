import React, { Component } from 'react';

import CheckoutRouter from '../../routes/Checkout/CheckoutRouter';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {}
    };

    componentDidMount() {

        const ingredients = {};
        const query = new URLSearchParams(this.props.location.search);

        for (const [ingredient, amount] of query.entries()) {
            ingredients[ingredient] = +amount;
        }

        this.setState(() => ({ ingredients }));

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

                <CheckoutRouter />

            </div>
        );
    }

}

export default Checkout;