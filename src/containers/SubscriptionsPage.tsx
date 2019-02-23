import React, { useState, useContext, useEffect } from 'react';
import PodcastService from '../services/podcastService';
import { Link } from 'react-router-dom';
import AppContext from '../components/AppContext';
import { Theme } from '@material-ui/core/styles';
import { Podcast } from '../models';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const podcastService = new PodcastService();

const useStyles = makeStyles((theme: Theme) => ({
  message: {
    padding: '30px 15px',
    textAlign: 'center',
    '& a': {
      color: theme.palette.primary.main,
    },
  },
  gridList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
    gridAutoRows: '1fr',
    gridGap: '5px',
  },
  tile: {
    paddingBottom: '100%',
    backgroundSize: 'contain',
  },
}));

function SubscriptionsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const context = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    context.setAppTitle('Subscriptions');

    podcastService
      .getSubscriptions()
      .then(podcasts => setPodcasts(podcasts))
      .catch(err => console.error('Failed to get podcasts', err));
  }, []);

  return (
    <div className="page-container">
      {podcasts.length === 0 && (
        <Typography className={classes.message}>
          It looks like you haven't subscribed to any podcasts yet.&nbsp;
          <Link to="/search">Let's go find some!</Link>
        </Typography>
      )}
      <div className={classes.gridList}>
        {podcasts.map(podcast => (
          <Link to={{ pathname: `/podcast/${podcast.id}` }} rel="div" key={podcast.id}>
            <div
              className={classes.tile}
              style={{ backgroundImage: `url(${podcast.cover['600']}` }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionsPage;
