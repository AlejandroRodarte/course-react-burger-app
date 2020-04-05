import React from 'react';

import classes from './Button.module.css';

const Button = ({ clicked, children, type }) => {

    const buttonClasses = [classes.Button, classes[type]].join(' ');

    return (
        <button
            onClick={ clicked }
            className={ buttonClasses }
        >
            { children }
        </button>
    );

};

export default Button;