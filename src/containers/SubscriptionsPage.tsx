import React, { useState, useContext, useEffect } from 'react';
import PodcastService from '../services/podcastService';
import { Link } from 'react-router-dom';
import AppContext from '../components/AppContext';
import { Theme } from '@material-ui/core/styles';
import { Podcast } from '../models';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ProgressButton from '../components/ProgressButton';

const podcastService = new PodcastService();

const useStyles = makeStyles((theme: Theme) => ({
  messageContainer: {
    textAlign: 'center',
    padding: '30px 15px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  message: {
    marginBottom: '20px',
  },
  actions: {
    '& button': {
      margin: '0 10px',
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

const MyLink = (props: any) => <Link to="/search" {...props} />;

function SubscriptionsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[] | null>(null);
  const [seeding, setSeeding] = useState(false);
  const context = useContext(AppContext);
  const classes = useStyles();

  useEffect(() => {
    context.setAppTitle('Subscriptions');
    loadSubscriptions();
  }, []);

  function loadSubscriptions() {
    podcastService
      .getSubscriptions()
      .then((podcasts) => setPodcasts(podcasts))
      .catch((err) => console.error('Failed to get podcasts', err));
  }

  async function seedData() {
    setSeeding(true);
    try {
      await Promise.all([
        podcastService.subscribe(430333725),
        podcastService.subscribe(1253186678),
        podcastService.subscribe(359703665),
      ]);
      loadSubscriptions();
    } catch (err) {
      console.error('Failed to seed data', err);
    }
    setSeeding(false);
  }

  return (
    <div className="page-container">
      {podcasts && podcasts.length === 0 && (
        <div className={classes.messageContainer}>
          <Typography className={classes.message}>
            It looks like you haven't subscribed to any podcasts yet. You can either search for some
            or use some demo subscriptions. What would you like to do?
          </Typography>
          <div className={classes.actions}>
            <Button color="primary" component={MyLink as any}>
              Search
            </Button>
            <ProgressButton
              variant="contained"
              disabled={seeding}
              loading={seeding}
              onClick={seedData}
            >
              Use Demo Data
            </ProgressButton>
          </div>
        </div>
      )}
      <div className={classes.gridList}>
        {podcasts &&
          podcasts.map((podcast) => (
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
