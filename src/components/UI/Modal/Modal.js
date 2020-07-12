import React, { Fragment } from 'react';

import classes from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

const Modal  = React.memo(({ show, children, modalClosed }) => {

    const modalStyles = {
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0'
    };
    
    return (
        <Fragment>
    
            <Backdrop 
                show={ show } 
                clicked={ modalClosed }
            />
    
            <div 
                className={ classes.Modal }
                style={ modalStyles }
            >
                { children }
            </div>
        
        </Fragment>
    );

});

export default Modal;
