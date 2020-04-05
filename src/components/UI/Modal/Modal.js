import React from 'react';

import classes from './Modal.module.css';

const Modal = ({ children, show }) => {

    const modalStyles = {
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0'
    };

    return (
        <div 
            className={ classes.Modal }
            style={ modalStyles }
        >
            { children }
        </div>
    );

};

export default Modal;
