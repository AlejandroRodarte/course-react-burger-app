import React from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.module.css'; 

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import withFormHandler from '../../../hoc/withFormHandler/withFormHandler';

import axios from '../../../axios/axios-orders';

import * as actions from '../../../store/actions';

const controls = {
    name: {
        inputType: 'input', 
        elementConfig: { 
            type: 'text', 
            placeholder: 'Your Name' 
        }, 
        value: '', 
        validation: { 
            required: true 
        }, 
        valid: false,
        touched: false
    },
    street: {
        inputType: 'input', 
        elementConfig: { 
            type: 'text', 
            placeholder: 'Your Street' 
        }, 
        value: '', 
        validation: { 
            required: true 
        }, 
        valid: false,
        touched: false
    },
    zipCode: {
        inputType: 'input', 
        elementConfig: { 
            type: 'text', 
            placeholder: 'Zip Code' 
        }, 
        value: '', 
        validation: { 
            required: true,
            minLength: 5,
            maxLength: 5,
            isNumeric: true
        }, 
        valid: false,
        touched: false
    },
    country: {
        inputType: 'input', 
        elementConfig: { 
            type: 'text', 
            placeholder: 'Country' 
        }, 
        value: '', 
        validation: { 
            required: true 
        },
        valid: false,
        touched: false
    },
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
    deliveryMethod: {
        inputType: 'select', 
        elementConfig: {
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
        value: 'fastest',
        validation: {},
        valid: true,
        touched: false
    }
};

const ContactData = ({ 
    price, 
    ingredients, 
    getFormValues, 
    onStartAddOrder, 
    onClearBuilder, 
    history, 
    loading, 
    formElementsJsx, 
    isFormValid,
    token,
    userId
}) => {

    const orderHandler = async (e) => {

        e.preventDefault();

        const orderData = getFormValues();

        const order = {
            ingredients: ingredients,
            price: price,
            orderData,
            userId
        };

        try {

            await onStartAddOrder(order, token);
            onClearBuilder();

            history.replace('/builder');
            
        } catch (e) { }

    };

    let formJsx = (
        <form onSubmit={ orderHandler }>

            { formElementsJsx }

            <Button 
                type="Success"
                clicked={ orderHandler }
                disabled={ !isFormValid }
            >
                ORDER
            </Button>

        </form>
    );

    if (loading) {
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

const mapStateToProps = state => ({
    ingredients: state.builder.ingredients,
    price: state.builder.totalPrice,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
    onClearBuilder: () => dispatch(actions.clearBuilder()),
    onStartAddOrder: (order, token) => dispatch(actions.startAddOrder(order, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withFormHandler(ContactData, controls), axios));