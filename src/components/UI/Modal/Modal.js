import React from 'react';

import classes from './Modal.module.css';

const Modal = ({ children }) => (
    <div className={ classes.Modal }>
        { children }
    </div>
);

export default Modal;
