/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import RegistrationFrom from './registration-form';
import Home from './Home';
import Nav from './Nav';
import './App.css';

export default () => (
  <Router>
    <div css={css`
      display: flex;

      Nav {
        padding: 2rem;
      }

      .container {
        flex: 1;
        padding: 2rem;
      }
    `}>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="registration-form" activeClassName="is-active">Registration Form</NavLink>
      </Nav>
      <div className="container">
        <Switch>
          <Route path="/registration-form">
            <RegistrationFrom />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
)
