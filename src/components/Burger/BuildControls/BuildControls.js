import React from 'react';

import classes from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

import * as burgerIngredientTypes from '../../../types/burger/burger-ingredient-types';
import burgerIngredientNames from '../../../utils/burger/burger-ingredient-names'

const controls = [
    {
        label: burgerIngredientNames[burgerIngredientTypes.SALAD],
        type: burgerIngredientTypes.SALAD
    },
    {
        label: burgerIngredientNames[burgerIngredientTypes.BACON],
        type: burgerIngredientTypes.BACON
    },
    {
        label: burgerIngredientNames[burgerIngredientTypes.CHEESE],
        type: burgerIngredientTypes.CHEESE
    },
    {
        label: burgerIngredientNames[burgerIngredientTypes.MEAT],
        type: burgerIngredientTypes.MEAT
    }
];

const BuildControls = ({ ingredientAdded, ingredientRemoved, disabled, price, purchaseable }) => (

    <div className={ classes.BuildControls }>

        <p>
            Current price: <strong>${ price.toFixed(2) }</strong>
        </p>

        {
            controls.map(
                ({ label, type }) => 
                    <BuildControl
                        key={ label }
                        label={ label }
                        added={ () => ingredientAdded(type) }
                        removed={ () => ingredientRemoved(type) }
                        disabled={ disabled[type] }
                    />
            )
        }

        <button 
            className={ classes.OrderButton }
            disabled={ !purchaseable }
        >
            ORDER NOW
        </button>

    </div>

);

export default BuildControls;