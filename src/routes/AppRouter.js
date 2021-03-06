import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import BurgerBuilder from '../containers/BurgerBuilder/BurgerBuilder';

import withSuspense from '../hoc/withSuspense/withSuspense';

const Checkout = withSuspense(React.lazy(() => import('../containers/Checkout/Checkout')));
const Orders = withSuspense(React.lazy(() => import('../containers/Orders/Orders')));
const Auth = withSuspense(React.lazy(() => import('../containers/Auth/Auth')));
const Logout = withSuspense(React.lazy(() => import('../containers/Auth/Logout/Logout')));

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