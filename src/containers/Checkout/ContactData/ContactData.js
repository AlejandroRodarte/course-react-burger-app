import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.module.css'; 

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../../axios/axios-orders';

import * as actions from '../../../store/actions';

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
                false,
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
                false,
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
                    maxLength: 5,
                    isNumeric: true
                },
                false,
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
                false,
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
                    required: true,
                    isEmail: true
                },
                false,
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
                'fastest',
                {},
                true
            )
        },
        formIsValid: false
    };

    orderHandler = async (e) => {

        e.preventDefault();

        const orderData = {};

        for (const inputName in this.state.orderForm) {
            orderData[inputName] = this.state.orderForm[inputName].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData
        };

        try {

            await this.props.onStartAddOrder(order);
            this.props.onClearBuilder();

            this.props.history.replace('/builder');

            // console.log(res);
            
        } catch (e) { }

    };

    inputChangedHandler = (inputName, e) => {

        const value = e.target.value;

        this.setState((prevState) => {

            const updatedForm = {
                ...prevState.orderForm,
                [inputName]: {
                    ...prevState.orderForm[inputName],
                    value,
                    valid: this.checkValidity(value, prevState.orderForm[inputName].validation),
                    touched: true
                }
            };

            return {
                orderForm: updatedForm,
                formIsValid: Object.keys(updatedForm).every(inputName => updatedForm[inputName].valid)
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

    getInputConfig(inputType = 'input', elementConfig = {}, value = '', validation = {}, valid = false, touched = false) {
        return { inputType, elementConfig, value, validation, valid, touched };
    }

    render() {

        // console.log(Object.keys(this.state.orderForm).map(inputName => ({ name: inputName, valid: this.state.orderForm[inputName].valid })));

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
                            touched={ this.state.orderForm[inputName].touched }
                            shouldValidate={ Object.keys(this.state.orderForm[inputName].validation).length > 0 }
                        />
                );

        let formJsx = (
            <form onSubmit={ this.orderHandler }>

                { formElementsJsx }

                <Button 
                    type="Success"
                    clicked={ this.orderHandler }
                    disabled={ !this.state.formIsValid }
                >
                    ORDER
                </Button>

            </form>
        );

        if (this.props.loading) {
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

const mapStateToProps = state => ({
    ingredients: state.builder.ingredients,
    price: state.builder.totalPrice,
    loading: state.orders.loading
});

const mapDispatchToProps = dispatch => ({
    onClearBuilder: () => dispatch(actions.clearBuilder()),
    onStartAddOrder: (order) => dispatch(actions.startAddOrder(order))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));