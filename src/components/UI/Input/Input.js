import React from 'react';

import classes from './Input.module.css';

const Input = ({ inputType, elementConfig, value, label, changed, invalid, shouldValidate }) => {

    let inputJsx = null;
    const inputClasses = [classes.InputElement];

    if (invalid && shouldValidate) {
        inputClasses.push(classes.Invalid);
    }

    switch (inputType) {

        case 'input':
            inputJsx = 
                <input 
                    className={ inputClasses.join(' ') } 
                    { ...elementConfig } 
                    value={ value } 
                    onChange={ changed }
                />;
            break;
        case 'textarea':
            inputJsx = 
                <textarea 
                    className={ inputClasses.join(' ') } 
                    { ...elementConfig } 
                    value={ value }
                    onChange={ changed }
                />;
            break;
        case 'select':
            inputJsx = (
                <select 
                    className={ inputClasses.join(' ') }
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
            inputJsx = <input className={ inputClasses.join(' ') } { ...elementConfig } value={ value } />;

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