import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const CheckoutSummary = ({ ingredients }) => (
    <div className={ classes.CheckoutSummary }>

        <h1>
            We hope it tastes well!
        </h1>

        <div style={ { width: '100%', margin: 'auto', textAlign: 'center' } }>
            <Burger ingredients={ ingredients }/>
        </div>

        <Button 
            type="Danger"
            clicked
        >
            CANCEL
        </Button>

        <Button 
            type="Danger"
            clicked
        >
            CONTINUE
        </Button>

    </div>
);

export default CheckoutSummary;