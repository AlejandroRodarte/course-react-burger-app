import React from 'react';

import classes from './Input.module.css';

const Input = ({ inputType, elementConfig, value, label, changed }) => {

    let inputJsx = null;

    switch (inputType) {

        case 'input':
            inputJsx = 
                <input 
                    className={ classes.InputElement } 
                    { ...elementConfig } 
                    value={ value } 
                    onChange={ changed }
                />;
            break;
        case 'textarea':
            inputJsx = 
                <textarea 
                    className={ classes.InputElement } 
                    { ...elementConfig } 
                    value={ value }
                    onChange={ changed }
                />;
            break;
        case 'select':
            inputJsx = (
                <select 
                    className={ classes.InputElement }
                    onChange={ changed }
                >
                    { 
                        elementConfig
                            .options
                            .map(({ value, displayValue }) => <option key={ value } value={ value }>{ displayValue }</option>)
                    }
                </select>
            );
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