import React from 'react';

import Button from '../../components/UI/Button/Button';

import withFormHandler from '../../hoc/withFormHandler/withFormHandler';

import classes from './Auth.module.css';

const controls = {
    email: {
        inputType: 'input',
        elementConfig: { 
            type: 'email', 
            placeholder: 'Your Email' 
        },
        value: '',
        validation: { 
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    },
    password: {
        inputType: 'input',
        elementConfig: { 
            type: 'password', 
            placeholder: 'Your Password' 
        },
        value: '',
        validation: { 
            required: true,
            minLength: 7
        },
        valid: false,
        touched: false
    }
};

const Auth = ({ formElementsJsx, isFormValid }) => (
    <div className={ classes.Auth }>
        <form>

            { formElementsJsx }

            <Button 
                type="Success"
                disabled={ !isFormValid }
            >
                SUBMIT
            </Button>

        </form>
    </div>
);

export default withFormHandler(Auth, controls);