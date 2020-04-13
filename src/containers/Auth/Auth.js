import React, { useState } from 'react';
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

    const [isSignUp, setIsSignUp] = useState(true);

    const submitHandler = (e) => {

        e.preventDefault();
        const credentials = getFormValues();

        onStartSetAuth(credentials, isSignUp);

    };

    const switchAuthModeHandler = (e) => {
        setIsSignUp(prevIsSignUp => !prevIsSignUp);
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

            <Button
                type="Danger"
                disabled={ false }
                clicked={ switchAuthModeHandler }
            >
                SWITCH TO { isSignUp ? 'SIGN IN' : 'SIGN UP' }
            </Button>

        </div>
    );

}

const mapDispatchToProps = dispatch => ({
    onStartSetAuth: (credentials, isSignUp) => dispatch(actions.startSetAuth(credentials, isSignUp))
});

export default connect(undefined, mapDispatchToProps)(withFormHandler(Auth, controls));