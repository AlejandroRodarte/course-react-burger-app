import React, { Component } from 'react';

import classes from './ContactData.module.css'; 

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios/axios-orders';

class ContactData extends Component {

    state = {
        orderForm: {
            name: this.getInputConfig('input', { type: 'text', placeholder: 'Your Name' }, ''),
            street: this.getInputConfig('input', { type: 'text', placeholder: 'Street' }, ''),
            zipCode: this.getInputConfig('input', { type: 'text', placeholder: 'Zip Code' }, ''),
            country: this.getInputConfig('input', { type: 'text', placeholder: 'Country' }, ''),
            email: this.getInputConfig('input', { type: 'email', placeholder: 'Your Email' }, ''),
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
                    value
                }
            }
        }));

    };

    getInputConfig(inputType = 'input', elementConfig = {}, value = '') {
        return { inputType, elementConfig, value };
    }

    render() {

        const formElementsJsx =
            Object
                .keys(this.state.orderForm)
                .map(
                    inputName => 
                        <Input
                            key={ inputName }
                            { ...this.state.orderForm[inputName] }
                            changed={ (e) => this.inputChangedHandler(inputName, e) }
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