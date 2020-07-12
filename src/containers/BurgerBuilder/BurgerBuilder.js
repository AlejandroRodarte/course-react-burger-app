import React, { Fragment, useState, useCallback } from 'react';
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
import { useEffect } from 'react';

const BurgerBuilder = ({ hasIngredients, onStartSetIngredients, ingredientsAmount, onAddIngredient, onRemoveIngredient, isAuthenticated, history, error, loading }) => {
    
    const [purchaseable, setPurchaseable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {

        if (!hasIngredients) {
            onStartSetIngredients();
        }
    
        if (ingredientsAmount > 0) {
            setPurchaseable(true);
        }

    }, [hasIngredients, ingredientsAmount, onStartSetIngredients]);

    const addIngredientHandler = useCallback((type) => {
        onAddIngredient(type);
        setPurchaseable(ingredientsAmount + 1 > 0);
    }, [ingredientsAmount, onAddIngredient]);

    const removeIngredientHandler = useCallback((type) => {
        onRemoveIngredient(type);
        setPurchaseable(ingredientsAmount - 1 > 0);
    }, [ingredientsAmount, onRemoveIngredient]);

    const purchaseHandler = useCallback(() => {

        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            history.replace('/auth');
        }

    }, [history, isAuthenticated]);

    const purchaseCancelHandler = useCallback(() => {
        setPurchasing(false);
    }, []);

    const purchaseContinueHandler = useCallback(() => history.push('/checkout'), [history]);
    
    let modalContentJsx = null;

    let mainContentJsx = error ? <p>Ingredients not loaded!</p> : null;

    if (hasIngredients) {

        mainContentJsx = (
            <Fragment>
                <Burger />

                <BuildControls
                    ingredientAdded={ addIngredientHandler }
                    ingredientRemoved={ removeIngredientHandler }
                    purchaseable={ purchaseable }
                    ordered={ purchaseHandler }
                    isAuthenticated={ isAuthenticated }
                /> 
            </Fragment>
        );

        modalContentJsx =
            <OrderSummary 
                purchaseCanceled={ purchaseCancelHandler }
                purchaseContinued={ purchaseContinueHandler }
            />;

    }

    if (loading) {
        mainContentJsx = <Spinner />;
    }

    return (
        <Fragment>

            <Modal 
                show={ purchasing }
                modalClosed={ purchaseCancelHandler }
            >
                { modalContentJsx }
            </Modal>

            { mainContentJsx }

        </Fragment>
    );

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
