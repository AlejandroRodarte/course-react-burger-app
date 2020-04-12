import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';

import withFormHandler from '../../hoc/withFormHandler/withFormHandler';

import classes from './Auth.module.css';

import * as actions from '../../store/actions';

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

const Auth = ({ formElementsJsx, isFormValid, onStartSetAuth, getFormValues }) => {

    const submitHandler = (e) => {

        e.preventDefault();
        const credentials = getFormValues();

        onStartSetAuth(credentials);

    };

    return (
        <div className={ classes.Auth }>
            <form onSubmit={ submitHandler }>
    
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

}

const mapDispatchToProps = dispatch => ({
    onStartSetAuth: (credentials) => dispatch(actions.startSetAuth(credentials))
});

export default connect(undefined, mapDispatchToProps)(withFormHandler(Auth, controls));