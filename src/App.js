import React from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/BurgerBuilder/Checkout/Checkout';

const App = () => (
  <div>
    <Layout>
      <BurgerBuilder />
      <Checkout />
    </Layout>
  </div>
);

export default App;
