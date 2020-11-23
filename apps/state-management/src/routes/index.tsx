import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../components/HomePage';
import Profile from '../components/Profile';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/users/:username" component={Profile} />
        <Route exact={true} path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;
