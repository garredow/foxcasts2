import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from 'components/Loading';
import PlaylistPage from './containers/PlaylistPage';

const SubscriptionsPage = Loadable({
  loader: () => import('./containers/SubscriptionsPage'),
  loading: Loading,
  delay: 300,
});

const SearchPage = Loadable({
  loader: () => import('./containers/SearchPage'),
  loading: Loading,
  delay: 300,
});

const PodcastDetailPage = Loadable({
  loader: () => import('./containers/PodcastDetailPage'),
  loading: Loading,
  delay: 300,
});

const Router = () => (
  <Switch>
    <Route exact path="/" component={SubscriptionsPage} />
    <Route path="/search" component={SearchPage} />
    <Route path="/podcast/:id" component={PodcastDetailPage} />
    <Route path="/playlist/:playlist" component={PlaylistPage} />
    <Route component={SubscriptionsPage} />
  </Switch>
);

export default Router;
