import React, { Component } from 'react';

import CheckoutRouter from '../../routes/Checkout/CheckoutRouter';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {},
        totalPrice: 0
    };

    componentDidMount() {

        let totalPrice = 0;

        const ingredients = {};
        const query = new URLSearchParams(this.props.location.search);

        for (const [ingredient, amount] of query.entries()) {

            if (ingredient === 'price') {
                totalPrice = +amount;
            } else {
                ingredients[ingredient] = +amount;
            }


        }

        this.setState(() => ({ ingredients, totalPrice }));

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

                <CheckoutRouter 
                    ingredients={ this.state.ingredients }
                    price={ this.state.totalPrice }
                />

            </div>
        );
    }

}

export default Checkout;