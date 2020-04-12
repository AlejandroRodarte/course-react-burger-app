import React, { Component } from 'react';
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

class ContactData extends Component {

    orderHandler = async (e) => {

        e.preventDefault();

        const orderData = this.props.getFormValues();

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

    render() {

        // console.log(Object.keys(this.state.orderForm).map(inputName => ({ name: inputName, valid: this.state.orderForm[inputName].valid })));

        let formJsx = (
            <form onSubmit={ this.orderHandler }>

                { this.props.formElementsJsx }

                <Button 
                    type="Success"
                    clicked={ this.orderHandler }
                    disabled={ !this.props.isFormValid }
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withFormHandler(ContactData, controls), axios));