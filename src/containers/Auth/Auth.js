import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

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

const Auth = ({ formElementsJsx, isFormValid, onStartSetAuth, getFormValues, loading, errorMessage, history }) => {

    const [isSignUp, setIsSignUp] = useState(true);

    const submitHandler = async (e) => {

        e.preventDefault();
        const credentials = getFormValues();

        try {
            await onStartSetAuth(credentials, isSignUp);
            history.replace('/builder');
        } catch (e) { }

    };

    const switchAuthModeHandler = (e) => {
        setIsSignUp(prevIsSignUp => !prevIsSignUp);
    };

    return (
        <div className={ classes.Auth }>

            { errorMessage && <p>{ errorMessage }</p> }

            <form onSubmit={ submitHandler }>
    
                { loading ? <Spinner /> : formElementsJsx }
    
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

const mapStateToProps = state => ({
    loading: state.auth.loading,
    errorMessage: state.auth.error ? state.auth.error.message : null
});

const mapDispatchToProps = dispatch => ({
    onStartSetAuth: (credentials, isSignUp) => dispatch(actions.startSetAuth(credentials, isSignUp))
});

export default connect(mapStateToProps, mapDispatchToProps)(withFormHandler(Auth, controls));