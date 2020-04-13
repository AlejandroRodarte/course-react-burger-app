import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const NavigationItems = ({ isAuthenticated }) => (
    <ul className={ classes.NavigationItems }>
        <NavigationItem link="/builder">
            Burger Builder
        </NavigationItem>
        <NavigationItem link="/orders">
            Orders
        </NavigationItem>
        {
            isAuthenticated ?
                <NavigationItem link="/auth">
                    Authenticate
                </NavigationItem> :
                <NavigationItem link="/logout">
                    Logout
                </NavigationItem>
        }
    </ul>
);

export default NavigationItems;