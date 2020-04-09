import React from 'react';

import classes from './Input.module.css';

const Input = ({ inputType, elementConfig, value, label }) => {

    let inputJsx = null;

    switch (inputType) {

        case 'input':
            inputJsx = <input className={ classes.InputElement } { ...elementConfig } value={ value } />;
            break;
        case 'textarea':
            inputJsx = <textarea className={ classes.InputElement } { ...elementConfig } value={ value } />;
            break;
        default:
            inputJsx = <input className={ classes.InputElement } { ...elementConfig } value={ value } />;

    }

    return (
        <div className={ classes.Input }>
            <label className={ classes.Label }>
                { label }
            </label>
            { inputJsx }
        </div>
    );

};

export default Input;