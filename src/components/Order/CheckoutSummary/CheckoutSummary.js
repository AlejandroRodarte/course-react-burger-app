import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const CheckoutSummary = ({ ingredients, checkoutCancelled, checkoutContinued }) => (
    <div className={ classes.CheckoutSummary }>

        <h1>
            We hope it tastes well!
        </h1>

        <div style={ { width: '100%', margin: 'auto', textAlign: 'center' } }>
            <Burger ingredients={ ingredients }/>
        </div>

        <Button 
            type="Danger"
            clicked={ checkoutCancelled }
        >
            CANCEL
        </Button>

        <Button 
            type="Danger"
            clicked={ checkoutContinued }
        >
            CONTINUE
        </Button>

    </div>
);

export default CheckoutSummary;