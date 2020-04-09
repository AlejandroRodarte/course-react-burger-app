import React from 'react';

import classes from './Input.module.css';

const Input = ({ inputType, elementConfig, value, label, changed, invalid, shouldValidate, touched }) => {

    let inputJsx = null;
    let inputErrorJsx = null;

    const inputClasses = [classes.InputElement];

    if (invalid && shouldValidate && touched) {
        inputClasses.push(classes.Invalid);
        inputErrorJsx = <p>Invalid value!</p>;
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
            { inputErrorJsx }
        </div>
    );

};

export default Input;