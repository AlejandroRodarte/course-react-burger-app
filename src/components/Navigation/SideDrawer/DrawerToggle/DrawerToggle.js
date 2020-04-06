import React from 'react';

import classes from './DrawerToggle.module.css';

const DrawerToggle = ({ click }) => (
    <div 
        onClick={ click }
        className={ classes.DrawerToggle }
    >
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle;
