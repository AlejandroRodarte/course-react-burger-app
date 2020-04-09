import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import ContactData from '../../containers/Checkout/ContactData/ContactData';

const CheckoutRouter = ({ match }) => (
    <Switch>
        <Route
            path={ `${match.path}/contact-data` }
            component={ ContactData }
        />
    </Switch>
);

export default withRouter(CheckoutRouter);