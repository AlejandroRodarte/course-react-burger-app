import React, { Fragment } from 'react';

const Layout = ({ children }) => (
    <Fragment>
        <div>
            Toolbar, SideDrawer, Backdrop components go here
        </div>
        <main>
            { children }
        </main>
    </Fragment>
);

export default Layout;
