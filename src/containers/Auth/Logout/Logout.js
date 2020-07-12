import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

const Logout = ({ onInitLogout }) => {

    useEffect(() => {
        console.log('logout init')
        onInitLogout();
    }, [onInitLogout]);

    return <Redirect to="/builder" />;

};

const mapDispatchToProps = dispatch => ({
    onInitLogout: () => dispatch(actions.initLogout())
});

export default connect(undefined, mapDispatchToProps)(Logout);
