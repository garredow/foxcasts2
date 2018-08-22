import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchPage from 'containers/SearchPage';
import PodcastDetailPage from 'containers/PodcastDetailPage';
import SubscriptionsPage from 'containers/SubscriptionsPage';

const NotFound = () => <div>Page not found!</div>;

const Router = () => (
  <Switch>
    <Route exact path="/" component={SubscriptionsPage} />
    <Route path="/search" component={SearchPage} />
    <Route path="/podcast/:id" component={PodcastDetailPage} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
