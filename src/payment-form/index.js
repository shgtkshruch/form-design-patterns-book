import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

import Page1 from './1';
import Page2 from './2';

const components = [Page1, Page2];

export default () => {
  return (
    <Router>
      <Route exact path="/payment-form">
        <Redirect to="/payment-form/1" />
      </Route>

      {components.map((component, i) => (
        <Route key={i} path={`/payment-form/${i+1}`} component={component} />
      ))}
    </Router>
  )
}
