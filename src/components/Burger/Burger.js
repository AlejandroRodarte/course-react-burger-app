import React from 'react';

import classes from './Burger.module.css';
import * as burgerIngredientTypes from '../../types/burger/burger-ingredient-types';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients }) => {
    
    const burgerIngredientsJsx = 
        Object
            .keys(ingredients)
            .map(
                ingredientKey => 
                    [...Array(ingredients[ingredientKey])]
                        .map(
                            (_, i) => 
                                <BurgerIngredient 
                                    key={ ingredientKey + i }
                                    type={ ingredientKey } 
                                />
                        )
            );

    return (
        <div className={ classes.Burger }>
            <BurgerIngredient type={ burgerIngredientTypes.BREAD_TOP } />
            { burgerIngredientsJsx }
            <BurgerIngredient type={ burgerIngredientTypes.BREAD_BOTTOM } />
        </div>
    );

}

export default Burger;