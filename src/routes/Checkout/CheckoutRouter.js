import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import ContactData from '../../containers/Checkout/ContactData/ContactData';

const CheckoutRouter = ({ match, ingredients, price }) => (
    <Switch>
        <Route
            path={ `${match.path}/contact-data` }
            component={ (props) => <ContactData { ...props } ingredients={ ingredients } price={ price } /> }
        />
    </Switch>
);

export default withRouter(CheckoutRouter);