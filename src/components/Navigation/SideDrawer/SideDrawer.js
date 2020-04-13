import React, { Fragment } from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.module.css';

const SideDrawer = ({ closed, open, isAuthenticated }) => {

    let sideDrawerClasses = [classes.SideDrawer, classes.Close];

    if (open) {
        sideDrawerClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Fragment>

            <Backdrop 
                show={ open }
                clicked={ closed } 
            />

            <div 
                className={ sideDrawerClasses.join(' ') }
                onClick={ closed }
            >
                <div className={ classes.Logo }>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={ isAuthenticated } />
                </nav>
            </div>

        </Fragment>
    );

};

export default SideDrawer;