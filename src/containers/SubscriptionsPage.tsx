import React from 'react';
import PodcastService from '../services/podcastService';
import { Link } from 'react-router-dom';
import AppContext from '../components/AppContext';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { Podcast, AppContextProps } from '../models';
import { Typography } from '@material-ui/core';

const podcastService = new PodcastService();

const styles: any = (theme: Theme) => ({
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
});

type PodcastTileProps = {
  classes: any;
  podcast: Podcast;
};

const PodcastTile = ({ classes, podcast }: PodcastTileProps) => (
  <Link to={{ pathname: `/podcast/${podcast.id}` }} rel="div">
    <div className={classes.tile} style={{ backgroundImage: `url(${podcast.cover['600']}` }} />
  </Link>
);

type SubscriptionsPageProps = WithStyles & AppContextProps;

interface SubscriptionsPageState {
  podcasts: Podcast[];
}

class SubscriptionsPage extends React.Component<SubscriptionsPageProps, SubscriptionsPageState> {
  state: SubscriptionsPageState = { podcasts: [] };

  componentDidMount() {
    this.props.setAppTitle('Subscriptions');

    podcastService
      .getSubscriptions()
      .then(podcasts => this.setState({ podcasts }))
      .catch(err => console.error('Failed to get podcasts', err));
  }
  render() {
    const { classes } = this.props;

    return (
      <div className="page-container">
        {this.state.podcasts.length === 0 && (
          <Typography className={classes.message}>
            It looks like you haven't subscribed to any podcasts yet.{' '}
            <Link to="/search">Let's go find some!</Link>
          </Typography>
        )}
        <div className={classes.gridList}>
          {this.state.podcasts.map(podcast => (
            <PodcastTile classes={classes} podcast={podcast} key={podcast.id} />
          ))}
        </div>
      </div>
    );
  }
}

const ComponentWithContext = (props: any) => (
  <AppContext.Consumer>
    {({ setAppTitle }: any) => <SubscriptionsPage {...props} setAppTitle={setAppTitle} />}
  </AppContext.Consumer>
);

export default withStyles(styles)(ComponentWithContext);
