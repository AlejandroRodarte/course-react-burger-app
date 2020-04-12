import React, { Component } from 'react';

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

class Auth extends Component {

    state = {
        controls: {
            email: this.getInputConfig(
                'input', 
                { 
                    type: 'email', 
                    placeholder: 'Your Email' 
                }, 
                '', 
                { 
                    required: true,
                    isEmail: true
                }, 
                false,
                false
            ),
            password: this.getInputConfig(
                'input', 
                { 
                    type: 'password', 
                    placeholder: 'Your Password' 
                }, 
                '', 
                { 
                    required: true,
                    minLength: 7
                }, 
                false,
                false
            )
        },
        formIsValid: false
    };

    inputChangedHandler = (inputName, e) => {

        const value = e.target.value;

        this.setState((prevState) => {

            const updatedForm = {
                ...prevState.controls,
                [inputName]: {
                    ...prevState.controls[inputName],
                    value,
                    valid: this.checkValidity(value, prevState.controls[inputName].validation),
                    touched: true
                }
            };

            return {
                controls: updatedForm,
                formIsValid: Object.keys(updatedForm).every(inputName => updatedForm[inputName].valid)
            };

        });

    };

    getInputConfig(
        inputType = 'input', 
        elementConfig = {}, 
        value = '', 
        validation = {}, 
        valid = false, 
        touched = false
    ) {
        return { 
            inputType, 
            elementConfig, 
            value, 
            validation, 
            valid, 
            touched 
        };
    }

    checkValidity(value, rules) {

        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;

    }

    render() {

        return (
            <div className={ classes.Auth }>
                <form>

                    { this.props.formElementsJsx }

                    <Button 
                        type="Success"
                        disabled={ !this.props.isFormValid }
                    >
                        SUBMIT
                    </Button>

                </form>
            </div>
        );

    }

}

export default withFormHandler(Auth, controls);