import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Repo } from '../pages/Repo';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route key="" path="/" exact component={Dashboard} />
      <Route key="" path="/repositorios/:repository+" component={Repo} />
    </Switch>
  );
};
