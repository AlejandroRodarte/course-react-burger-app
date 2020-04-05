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
            )
            .reduce((prevJsxArr, curJsxArr) => [...prevJsxArr, ...curJsxArr], []);

    return (
        <div className={ classes.Burger }>
            <BurgerIngredient type={ burgerIngredientTypes.BREAD_TOP } />
            { burgerIngredientsJsx.length > 0 ? burgerIngredientsJsx : <p>Please start adding ingredients!</p> }
            <BurgerIngredient type={ burgerIngredientTypes.BREAD_BOTTOM } />
        </div>
    );

}

export default Burger;