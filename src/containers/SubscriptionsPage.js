import React from 'react';
import PodcastService from '../services/podcastService';
import { Link } from 'react-router-dom';
import AppContext from '../components/AppContext';
import { withStyles } from '@material-ui/core/styles';

const podcastService = new PodcastService();

const styles = {
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
};

const PodcastTile = ({ classes, podcast }) => (
  <Link to={{ pathname: `/podcast/${podcast.id}` }} rel="div">
    <div className={classes.tile} style={{ backgroundImage: `url(${podcast.cover['600']}` }} />
  </Link>
);

class SubscriptionsPage extends React.Component {
  state = { podcasts: [] };

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
        <div className={classes.gridList}>
          {this.state.podcasts.map(podcast => (
            <PodcastTile classes={classes} podcast={podcast} key={podcast.id} />
          ))}
        </div>
      </div>
    );
  }
}

const ComponentWithContext = props => (
  <AppContext.Consumer>
    {({ setAppTitle }) => <SubscriptionsPage {...props} setAppTitle={setAppTitle} />}
  </AppContext.Consumer>
);

export default withStyles(styles)(ComponentWithContext);
