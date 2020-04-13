import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import AppRouter from './routes/AppRouter';

import store from './store/store';
import * as actions from './store/actions';

store.dispatch(actions.autoLogin());

const App = () => (
  <div>
    <BrowserRouter>
      <Layout>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  </div>
);

export default App;
