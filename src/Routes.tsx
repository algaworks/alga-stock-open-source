import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import ProductsView from './views/Products';
import LoginView from './views/Login';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/products" />
        </Route>
        <Route path="/products" exact>
          <ProductsView />
        </Route>
        <Route path="/login" exact>
          <LoginView />
        </Route>
      </Switch>
    </Router>
  );
}