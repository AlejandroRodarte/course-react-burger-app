import React from 'react';

import classes from './Button.module.css';

const Button = ({ clicked, children, type, disabled }) => {

    const buttonClasses = [classes.Button, classes[type]].join(' ');

    return (
        <button
            onClick={ clicked }
            className={ buttonClasses }
            disabled={ disabled }
        >
            { children }
        </button>
    );

};

export default Button;