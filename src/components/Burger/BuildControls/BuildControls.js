import React from 'react';

import classes from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

import * as burgerIngredientTypes from '../../../types/burger/burger-ingredient-types';

const controls = [
    {
        label: 'Salad',
        type: burgerIngredientTypes.SALAD
    },
    {
        label: 'Bacon',
        type: burgerIngredientTypes.BACON
    },
    {
        label: 'Cheese',
        type: burgerIngredientTypes.CHEESE
    },
    {
        label: 'Meat',
        type: burgerIngredientTypes.MEAT
    }
];

const BuildControls = ({ ingredientAdded }) => (
    <div className={ classes.BuildControls }>
        {
            controls.map(
                ({ label, type }) => 
                    <BuildControl
                        key={ label }
                        label={ label }
                        added={ () => ingredientAdded(type) }
                    />
            )
        }
    </div>
);

export default BuildControls;