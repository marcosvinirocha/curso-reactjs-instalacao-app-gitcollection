import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import { Dashboard } from '../pages/Dashboard';
// import { Repo } from '../pages/Repo';

const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Repo = React.lazy(() => import('../pages/Repo'));

export const Routes: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route key="" path="/" exact component={Dashboard} />
        <Route key="" path="/repositorios/:repository+" component={Repo} />
      </Switch>
    </React.Suspense>
  );
};
