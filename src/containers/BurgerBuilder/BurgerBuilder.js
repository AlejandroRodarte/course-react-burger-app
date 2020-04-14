import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios/axios-orders';

import * as actions from '../../store/actions';

import getIngredientsAmount from '../../utils/functions/burger-builder/get-ingredients-amount';

export class BurgerBuilder extends Component {
    
    state = {
        purchaseable: false,
        purchasing: false
    };

    async componentDidMount() {

        if (!this.props.hasIngredients) {
            try {
                await this.props.onStartSetIngredients();
            } catch (e) { }
        }

        if (this.props.ingredientsAmount > 0) {
            this.setState(() => ({ purchaseable: true }));
        }

    }

    addIngredientHandler = (type) => {
        this.props.onAddIngredient(type);
        this.setState(() => ({ purchaseable: this.props.ingredientsAmount + 1 > 0 }));
    };

    removeIngredientHandler = (type) => {
        this.props.onRemoveIngredient(type);
        this.setState(() => ({ purchaseable: this.props.ingredientsAmount + 1 > 0 }));
    };

    purchaseHandler = () => {

        if (this.props.isAuthenticated) {
            this.setState(() => ({ purchasing: true }));
        } else {
            this.props.history.replace('/auth');
        }

    };

    purchaseCancelHandler = () => {
        this.setState(() => ({ purchasing: false }));
    };

    purchaseContinueHandler = () => this.props.history.push('/checkout');
    
    render() {

        let modalContentJsx = null;

        let mainContentJsx = this.props.error ? <p>Ingredients not loaded!</p> : null;

        if (this.props.hasIngredients) {

            mainContentJsx = (
                <Fragment>
                    <Burger />
    
                    <BuildControls
                        ingredientAdded={ this.addIngredientHandler }
                        ingredientRemoved={ this.removeIngredientHandler }
                        purchaseable={ this.state.purchaseable }
                        ordered={ this.purchaseHandler }
                        isAuthenticated={ this.props.isAuthenticated }
                    /> 
                </Fragment>
            );

            modalContentJsx =
                <OrderSummary 
                    purchaseCanceled={ this.purchaseCancelHandler }
                    purchaseContinued={ this.purchaseContinueHandler }
                />;

        }

        if (this.props.loading) {
            mainContentJsx = <Spinner />;
        }

        return (
            <Fragment>

                <Modal 
                    show={ this.state.purchasing }
                    modalClosed={ this.purchaseCancelHandler }
                >
                    { modalContentJsx }
                </Modal>

                { mainContentJsx }

            </Fragment>
        );

    }

}

const mapStateToProps = state => ({
    hasIngredients: Object.keys(state.builder.ingredients).length > 0,
    ingredientsAmount: getIngredientsAmount(state.builder.ingredients),
    error: state.builder.error,
    isAuthenticated: !!state.auth.token,
    loading: state.builder.loading
});

const mapDispatchToProps = dispatch => ({
    onStartSetIngredients: () => dispatch(actions.startSetIngredients()),
    onAddIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onRemoveIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
