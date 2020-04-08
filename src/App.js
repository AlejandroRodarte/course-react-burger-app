import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import AppRouter from './routes/AppRouter';

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
