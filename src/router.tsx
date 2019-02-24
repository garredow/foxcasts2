import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './components/Loading';

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

const PlaylistPage = Loadable({
  loader: () => import('./containers/PlaylistPage'),
  loading: Loading,
  delay: 300,
});

const SettingsPage = Loadable({
  loader: () => import('./containers/SettingsPage'),
  loading: Loading,
  delay: 300,
});

const Router = () => (
  <Switch>
    <Route path="/search" component={SearchPage} />
    <Route path="/podcast/:id" component={PodcastDetailPage} />
    <Route path="/playlist/:playlist" component={PlaylistPage} />
    <Route path="/settings" component={SettingsPage} />
    <Route path="/" component={SubscriptionsPage} />
    <Redirect to="/" />
  </Switch>
);

export default Router;
