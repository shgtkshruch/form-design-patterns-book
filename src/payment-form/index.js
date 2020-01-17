import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

import Page1 from './1';
import Page2 from './2';
import Page3 from './3';
import Page4 from './4';
import Page5 from './5';
import Page6 from './6';

const components = [
  Page1,
  Page2,
  Page3,
  Page4,
  Page5,
  Page6,
];

const path = `/payment-form`;

export default () => (
  <Router>
    <Route exact path={path}>
      <Redirect to={`${path}/1`} />
    </Route>
    {components.map((component, i) => (
      <Route key={i} path={`${path}/${i+1}`} component={component} />
    ))}
  </Router>
)

