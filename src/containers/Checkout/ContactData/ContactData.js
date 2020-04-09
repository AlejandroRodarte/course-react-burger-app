import React, { Component } from 'react';

import classes from './ContactData.module.css'; 

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios/axios-orders';

class ContactData extends Component {

    state = {
        orderForm: {
            name: this.getInputConfig(
                'input', 
                { 
                    type: 'text', 
                    placeholder: 'Your Name' 
                }, 
                '', 
                { 
                    required: true 
                }, 
                false
            ),
            street: this.getInputConfig(
                'input', 
                { 
                    type: 'text', 
                    placeholder: 'Street' 
                }, 
                '', 
                { 
                    required: true 
                },
                false
            ),
            zipCode: this.getInputConfig(
                'input', 
                { 
                    type: 'text', 
                    placeholder: 'Zip Code' 
                }, 
                '', 
                { 
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                false
            ),
            country: this.getInputConfig(
                'input', 
                { 
                    type: 'text', 
                    placeholder: 
                    'Country' 
                }, 
                '', 
                { 
                    required: true 
                },
                false
            ),
            email: this.getInputConfig(
                'input', 
                { 
                    type: 'email', 
                    placeholder: 'Your Email' 
                }, 
                '', 
                { 
                    required: true 
                },
                false
            ),
            deliveryMethod: this.getInputConfig(
                'select', 
                {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]
                },
                'fastest'
            )
        },
        loading: false
    };

    orderHandler = async (e) => {

        e.preventDefault();

        const orderData = {};

        for (const inputName in this.state.orderForm) {
            orderData[inputName] = this.state.orderForm[inputName].value;
        }
        
        this.setState(() => ({ loading: true }));

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData
        };

        try {

            const res = await axios.post('/orders.json', order);

            this.setState(() => ({ loading: false }));
            this.props.history.replace('/builder');

            console.log(res);
            
        } catch (e) {
            this.setState(() => ({ loading: false }));
            console.log(e);
        }

    };

    inputChangedHandler = (inputName, e) => {

        const value = e.target.value;

        this.setState((prevState) => ({ 
            orderForm: {
                ...prevState.orderForm,
                [inputName]: {
                    ...prevState.orderForm[inputName],
                    value,
                    valid: this.checkValidity(value, prevState.orderForm[inputName].validation)
                }
            }
        }));

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

        return isValid;

    }

    getInputConfig(inputType = 'input', elementConfig = {}, value = '', validation = {}, valid = false) {
        return { inputType, elementConfig, value, validation, valid };
    }

    render() {

        console.log(this.state.orderForm.zipCode);

        const formElementsJsx =
            Object
                .keys(this.state.orderForm)
                .map(
                    inputName => 
                        <Input
                            key={ inputName }
                            inputType={ this.state.orderForm[inputName].inputType }
                            elementConfig={ this.state.orderForm[inputName].elementConfig }
                            value={ this.state.orderForm[inputName].value }
                            changed={ (e) => this.inputChangedHandler(inputName, e) }
                            invalid={ !this.state.orderForm[inputName].valid }
                            shouldValidate={ Object.keys(this.state.orderForm[inputName].validation).length > 0 }
                        />
                );

        let formJsx = (
            <form onSubmit={ this.orderHandler }>

                { formElementsJsx }

                <Button 
                    type="Success"
                    clicked={ this.orderHandler }
                >
                    ORDER
                </Button>

            </form>
        );

        if (this.state.loading) {
            formJsx = <Spinner />;
        }

        return (
            <div className={ classes.ContactData }>

                <h4>
                    Enter your contact data
                </h4>

                { formJsx }

            </div>
        );

    }

}

export default ContactData;