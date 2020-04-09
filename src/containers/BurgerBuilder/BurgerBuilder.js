import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import burgerIngredientPrices from '../../utils/burger/burger-ingredient-prices';
import parseObjectToQueryParams from '../../utils/functions/parse-object-to-query-params';

import axios from '../../axios/axios-orders';

class BurgerBuilder extends Component {
    
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    async componentDidMount() {
        try {
            const { data: ingredients } = await axios.get('/ingredients.json');
            this.setState(() => ({ ingredients }));
        } catch (e) {
            this.setState(() => ({ error: true }));
            console.log(e);
        }
    }

    addIngredientHandler = (type) => {

        this.setState(
            (prevState) => 
                (
                    { 
                        ingredients: { 
                            ...this.state.ingredients, 
                            [type]: prevState.ingredients[type] + 1
                        },
                        totalPrice: prevState.totalPrice + burgerIngredientPrices[type],
                        purchaseable: this.getIngredientAmount(prevState.ingredients) + 1 > 0
                    }
                )
        );

    };

    removeIngredientHandler = (type) => {

        this.setState(
            (prevState) => 
                (
                    { 
                        ingredients: { 
                            ...this.state.ingredients, 
                            [type]: prevState.ingredients[type] <= 0 ? 0 : prevState.ingredients[type] - 1
                        },
                        totalPrice: prevState.ingredients[type] <= 0 ? prevState.totalPrice : prevState.totalPrice - burgerIngredientPrices[type],
                        purchaseable: this.getIngredientAmount(prevState.ingredients) - 1 > 0
                    }
                )
        );

    };

    purchaseHandler = () => {
        this.setState(() => ({ purchasing: true }));
    };

    purchaseCancelHandler = () => {
        this.setState(() => ({ purchasing: false }));
    };

    purchaseContinueHandler = () => {

        const search = `${parseObjectToQueryParams(this.state.ingredients)}&price=${this.state.totalPrice}`;

        this.props.history.push({
            pathname: '/checkout',
            search
        });

    };

    getIngredientAmount(ingredients) {
        return Object
                .keys(ingredients)
                .map(ingredientKey => ingredients[ingredientKey])
                .reduce((acc, cv) => acc + cv, 0);
    }
    
    render() {

        let modalContentJsx = null;

        let mainContentJsx = this.state.error ? <p>Ingredients not loaded!</p> : <Spinner />;

        if (this.state.ingredients) {

            const disabledButtonsInfo = {};

            Object
                .keys(this.state.ingredients)
                .forEach((ingredientKey) => disabledButtonsInfo[ingredientKey] = this.state.ingredients[ingredientKey] <= 0);

            mainContentJsx = (
                <Fragment>
                    <Burger ingredients={ this.state.ingredients } />
    
                    <BuildControls
                        price={ this.state.totalPrice }
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
                    ingredients={ this.state.ingredients }
                    purchaseCanceled={ this.purchaseCancelHandler }
                    purchaseContinued={ this.purchaseContinueHandler }
                    price={ this.state.totalPrice }
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

export default withErrorHandler(BurgerBuilder, axios);
