import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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

                <Toolbar 
                    opened={ this.sideDrawerOpenHandler }
                    isAuthenticated={ this.props.isAuthenticated }
                />

                <SideDrawer
                    isAuthenticated={ this.props.isAuthenticated }
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

const mapStateToProps = state => ({
    isAuthenticated: !state.auth.token
});

export default connect(mapStateToProps, undefined)(Layout);
