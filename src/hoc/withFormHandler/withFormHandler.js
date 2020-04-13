import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';

import updateState from '../../utils/functions/store/update-state';

const withFormHandler = (WrappedComponent, controls) => class extends Component {

    state = {
        controls,
        isFormValid: false
    };

    inputChangedHandler = (inputName, e) => {

        const value = e.target.value;

        this.setState((prevState) => {

            const updatedForm = updateState(prevState.controls, {
                [inputName]: updateState(prevState.controls[inputName], {
                    value,
                    valid: this.checkValidity(value, prevState.controls[inputName].validation),
                    touched: true
                }) 
            });

            return {
                controls: updatedForm,
                isFormValid: Object.keys(updatedForm).every(inputName => updatedForm[inputName].valid)
            };

        });

    };

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

    getFormValues = () => {

        const formValues = {};

        for (const inputName in this.state.controls) {
            formValues[inputName] = this.state.controls[inputName].value;
        }

        return formValues;

    };

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
            <WrappedComponent
                { ...this.props }
                formElementsJsx={ formElementsJsx }
                isFormValid={ this.state.isFormValid }
                getFormValues={ this.getFormValues }
            />
        );

    }

};

export default withFormHandler;
