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
                }
            )
        },
        loading: false
    };

    orderHandler = async (e) => {

        e.preventDefault();
        
        this.setState(() => ({ loading: true }));

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Alex',
                address: {
                    street: 'Test street',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
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

    getInputConfig(inputType = 'input', elementConfig = {}, value = '') {
        return { inputType, elementConfig, value };
    }

    render() {

        let formJsx = (
            <form>

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