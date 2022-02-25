/* eslint-disable react/jsx-key */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Repo } from '../pages/Repo';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/repositorios" component={Repo} />
    </Switch>
  );
};
