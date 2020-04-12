import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.module.css';

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

        const formElementsJsx =
            Object
                .keys(this.state.controls)
                .map(
                    inputName => 
                        <Input
                            key={ inputName }
                            inputType={ this.state.controls[inputName].inputType }
                            elementConfig={ this.state.controls[inputName].elementConfig }
                            value={ this.state.controls[inputName].value }
                            changed={ (e) => this.inputChangedHandler(inputName, e) }
                            invalid={ !this.state.controls[inputName].valid }
                            touched={ this.state.controls[inputName].touched }
                            shouldValidate={ Object.keys(this.state.controls[inputName].validation).length > 0 }
                        />
                );

        return (
            <div className={ classes.Auth }>
                <form>

                    { formElementsJsx }

                    <Button 
                        type="Success"
                        disabled={ !this.state.formIsValid }
                    >
                        SUBMIT
                    </Button>

                </form>
            </div>
        );

    }

}

export default Auth;