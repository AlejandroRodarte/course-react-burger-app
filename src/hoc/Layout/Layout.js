import React, { Fragment, useState, useCallback } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

const Layout = ({ isAuthenticated, children }) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = useCallback(() => setShowSideDrawer(false), []);
    
    const sideDrawerOpenHandler = useCallback(() => setShowSideDrawer(prev => !prev), []);

    return (
        <Fragment>

            <Toolbar 
                opened={ sideDrawerOpenHandler }
                isAuthenticated={ isAuthenticated }
            />

            <SideDrawer
                isAuthenticated={ isAuthenticated }
                closed={ sideDrawerClosedHandler }
                open={ showSideDrawer }
            />

            <main className={ classes.Content }>
                { children }
            </main>

        </Fragment>
    );

};

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.token
});

export default connect(mapStateToProps, undefined)(Layout);
