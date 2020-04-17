import React from 'react';
import { Router } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import AppRouter from './routes/AppRouter';

import store from './store/store';
import * as actions from './store/actions';

import history from './history/history';

store.dispatch(actions.autoLogin());

const App = () => (
  <div>
    <Router history={ history }>
      <Layout>
        <AppRouter />
      </Layout>
    </Router>
  </div>
);

export default App;
