import React from 'react';

import classes from './Input.module.css';

const Input = ({ inputType, label, ...rest }) => {

    let inputJsx = null;

    switch (inputType) {

        case 'input':
            inputJsx = <input className={ classes.InputElement } { ...rest } />;
            break;
        case 'textarea':
            inputJsx = <textarea className={ classes.InputElement } { ...rest } />;
            break;
        default:
            inputJsx = <input className={ classes.InputElement } { ...rest } />;

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