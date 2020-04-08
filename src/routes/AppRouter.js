import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../containers/BurgerBuilder/Checkout/Checkout';

const AppRouter = () => (
    <Switch>
        <Route
            path="/builder"
            component={ BurgerBuilder }
        />
        <Route
            path="/checkout"
            component={ Checkout }
        />
        <Redirect
            to="/builder"
        />
    </Switch>
);

export default AppRouter;