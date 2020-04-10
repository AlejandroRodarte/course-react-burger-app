import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios/axios-orders';

import * as builderActions from '../../store/actions/builder';

class BurgerBuilder extends Component {
    
    state = {
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    async componentDidMount() {

        if (!this.props.ingredients) {
            try {
                const { data: ingredients } = await axios.get('/ingredients.json');
                this.props.onSetIngredients(ingredients);
            } catch (e) {
                this.setState(() => ({ error: true }));
                console.log(e);
            }
        }

    }

    addIngredientHandler = (type) => {
        this.props.onAddIngredient(type);
        this.setState(() => ({ purchaseable: this.getIngredientAmount(this.props.ingredients) + 1 > 0 }));
    };

    removeIngredientHandler = (type) => {
        this.props.onRemoveIngredient(type);
        this.setState(() => ({ purchaseable: this.getIngredientAmount(this.props.ingredients) + 1 > 0 }));
    };

    purchaseHandler = () => {
        this.setState(() => ({ purchasing: true }));
    };

    purchaseCancelHandler = () => {
        this.setState(() => ({ purchasing: false }));
    };

    purchaseContinueHandler = () => this.props.history.push('/checkout');

    getIngredientAmount(ingredients) {
        return Object
                .keys(ingredients)
                .map(ingredientKey => ingredients[ingredientKey])
                .reduce((acc, cv) => acc + cv, 0);
    }
    
    render() {

        let modalContentJsx = null;

        let mainContentJsx = this.state.error ? <p>Ingredients not loaded!</p> : <Spinner />;

        if (this.props.ingredients) {

            const disabledButtonsInfo = {};

            Object
                .keys(this.props.ingredients)
                .forEach((ingredientKey) => disabledButtonsInfo[ingredientKey] = this.props.ingredients[ingredientKey] <= 0);

            mainContentJsx = (
                <Fragment>
                    <Burger />
    
                    <BuildControls
                        ingredientAdded={ this.addIngredientHandler }
                        ingredientRemoved={ this.removeIngredientHandler }
                        disabled={ disabledButtonsInfo }
                        purchaseable={ this.state.purchaseable }
                        ordered={ this.purchaseHandler }
                    /> 
                </Fragment>
            );

            modalContentJsx =
                <OrderSummary 
                    purchaseCanceled={ this.purchaseCancelHandler }
                    purchaseContinued={ this.purchaseContinueHandler }
                />;

        }

        if (this.state.loading) {
            modalContentJsx = <Spinner />;
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
    ingredients: state.builder.ingredients,
    totalPrice: state.builder.totalPrice
});

const mapDispatchToProps = dispatch => ({
    onSetIngredients: (ingredients) => dispatch(builderActions.setIngredients(ingredients)),
    onAddIngredient: (ingredientName) => dispatch(builderActions.addIngredient(ingredientName)),
    onRemoveIngredient: (ingredientName) => dispatch(builderActions.removeIngredient(ingredientName))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
