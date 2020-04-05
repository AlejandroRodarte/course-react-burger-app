import React from 'react';

import classes from './Burger.module.css';
import * as burgerIngredientTypes from '../../types/burger/burger-ingredient-types';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = () => (
    <div className={ classes.Burger }>
        <BurgerIngredient type={ burgerIngredientTypes.BREAD_TOP } />
        <BurgerIngredient type={ burgerIngredientTypes.CHEESE } />
        <BurgerIngredient type={ burgerIngredientTypes.MEAT } />
        <BurgerIngredient type={ burgerIngredientTypes.BREAD_BOTTOM } />
    </div>
);

export default Burger;