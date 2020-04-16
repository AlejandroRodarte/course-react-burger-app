import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

class Logout extends Component {

    componentDidMount() {
        this.props.onInitLogout();
    }

    render() {
        return <Redirect to="/builder" />;
    }

}

const mapDispatchToProps = dispatch => ({
    onInitLogout: () => dispatch(actions.initLogout())
});

export default connect(undefined, mapDispatchToProps)(Logout);
