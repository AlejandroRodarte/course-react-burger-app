import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CheckoutRouter from '../../routes/Checkout/CheckoutRouter';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

const Checkout = ({ history, hasIngredients }) => {

    const checkoutCancelledHandler = useCallback(() => history.goBack(), [history]);
    
    const checkoutContinuedHandler = useCallback(() => history.replace('/checkout/contact-data'), [history]);
    
    let jsx = (
        <div>

            <CheckoutSummary 
                checkoutCancelled={ checkoutCancelledHandler }
                checkoutContinued={ checkoutContinuedHandler }
            />

            <CheckoutRouter />

        </div>
    );

    if (!hasIngredients) {
        jsx = <Redirect to="/builder" />;
    }
    
    return jsx;

};

const mapStateToProps = state => ({
    hasIngredients: Object.keys(state.builder.ingredients).length > 0
});

export default connect(mapStateToProps, undefined)(Checkout);