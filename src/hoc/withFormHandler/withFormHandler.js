import React, { useState, useCallback } from 'react';

import Input from '../../components/UI/Input/Input';

import updateState from '../../utils/functions/store/update-state';

const withFormHandler = (WrappedComponent, controls) => props => {

    const [form, setForm] = useState({
        controls,
        isFormValid: false
    });

    const inputChangedHandler = useCallback((inputName, e) => {

        const value = e.target.value;

        setForm(form => {

            const newForm = updateState(form.controls, {
                [inputName]: updateState(form.controls[inputName], {
                    value,
                    valid: checkValidity(value, form.controls[inputName].validation),
                    touched: true
                })
            });

            return {
                controls: newForm,
                isFormValid: Object.keys(newForm).every(inputName => newForm[inputName].valid)
            };

        });

    }, []);

    const checkValidity = (value, rules) => {

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

    const getFormValues = useCallback(() => {

        const formValues = {};

        for (const inputName in controls) {
            formValues[inputName] = form.controls[inputName].value;
        }

        return formValues;

    }, [form]);

    const formElementsJsx =
        Object
            .keys(form.controls)
            .map(
                inputName => 
                    <Input
                        key={ inputName }
                        inputType={ form.controls[inputName].inputType }
                        elementConfig={ form.controls[inputName].elementConfig }
                        value={ form.controls[inputName].value }
                        changed={ (e) => inputChangedHandler(inputName, e) }
                        invalid={ !form.controls[inputName].valid }
                        touched={ form.controls[inputName].touched }
                        shouldValidate={ Object.keys(form.controls[inputName].validation).length > 0 }
                    />
            ); 

    return (
        <WrappedComponent
            { ...props }
            formElementsJsx={ formElementsJsx }
            isFormValid={ form.isFormValid }
            getFormValues={ getFormValues }
        />
    );

};

export default withFormHandler;
