import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';
import Checkout from '../containers/Checkout/Checkout';
import Orders from '../containers/Orders/Orders';
import Auth from '../containers/Auth/Auth';
import Logout from '../containers/Auth/Logout/Logout';

const AppRouter = () => (
    <Switch> 
        <Route
            path="/auth"
            component={ Auth }
        />
        <Route
            path="/builder"
            component={ BurgerBuilder }
        />
        <Route
            path="/checkout"
            component={ Checkout }
        />
        <Route
            path="/orders"
            component={ Orders }
        />
        <Route
            path="/logout"
            component={ Logout }
        />
        <Redirect
            to="/builder"
        />
    </Switch>
);

export default AppRouter;