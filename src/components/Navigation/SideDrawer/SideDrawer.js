import React, { Fragment } from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.module.css';

const SideDrawer = ({ closed, open }) => {

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

            <div className={ sideDrawerClasses.join(' ') }>
                <div className={ classes.Logo }>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>

        </Fragment>
    );

};

export default SideDrawer;