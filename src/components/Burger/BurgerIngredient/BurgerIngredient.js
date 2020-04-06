import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.module.css';

import * as burgerIngredientTypes from '../../../types/burger/burger-ingredient-types';

const BurgerIngredient = ({ type }) => {

    let ingredient = null;

    switch (type) {

        case burgerIngredientTypes.BREAD_BOTTOM:
            ingredient = <div className={ classes.BreadBottom }></div>;
            break;

        case burgerIngredientTypes.BREAD_TOP:
            ingredient = (
                <div className={ classes.BreadTop }>
                    <div className={ classes.Seeds1 }></div>
                    <div className={ classes.Seeds2 }></div>
                </div>
            );
            break;

        case burgerIngredientTypes.MEAT:
            ingredient = <div className={ classes.Meat }></div>;
            break;

        case burgerIngredientTypes.CHEESE:
            ingredient = <div className={ classes.Cheese }></div>;
            break;

        case burgerIngredientTypes.SALAD:
            ingredient = <div className={ classes.Salad }></div>;
            break;

        case burgerIngredientTypes.BACON:
            ingredient = <div className={ classes.Bacon }></div>;
            break;

        default:
            ingredient = null;
            break;

    }

    return ingredient;

};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;
