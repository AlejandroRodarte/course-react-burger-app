import React from 'react';

import classes from './Order.module.css';

const Order = ({ ingredients, price }) => (
    <div className={ classes.Order }>

        <p>
            Ingredients: { 
                Object
                    .keys(ingredients)
                    .map(
                        ingredientKey => 
                            <span 
                                key={ ingredientKey }
                                style={ 
                                    { 
                                        textTransform: 'capitalize',
                                        display: 'inline-block',
                                        margin: '0 0.5rem',
                                        border: '1px solid #ccc',
                                        padding: '5px'
                                    } 
                                }
                            >
                                { ingredientKey }: ({ ingredients[ingredientKey] })
                            </span>
                    ) 
            }
        </p>

        <p>
            Price: <strong>${ price.toFixed(2) }</strong>
        </p>

    </div>
);

export default Order;