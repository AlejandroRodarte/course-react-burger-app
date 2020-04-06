import React, { Fragment, Component } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => this.setState(() => ({ showSideDrawer: false }));

    sideDrawerOpenHandler = () => this.setState((prevState) => ({ showSideDrawer: !prevState.showSideDrawer }));

    render() {

        return (
            <Fragment>

                <Toolbar opened={ this.sideDrawerOpenHandler } />

                <SideDrawer 
                    closed={ this.sideDrawerClosedHandler }
                    open={ this.state.showSideDrawer }
                />

                <main className={ classes.Content }>
                    { this.props.children }
                </main>

            </Fragment>
        );

    }

}

export default Layout;
