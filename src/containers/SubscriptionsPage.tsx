import React from 'react';
import PodcastService from '../services/podcastService';
import { Link } from 'react-router-dom';
import AppContext from '../components/AppContext';
import { withStyles } from '@material-ui/core/styles';
import { Podcast, AppContextProps } from '../models';

const podcastService = new PodcastService();

const styles: any = {
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

interface PodcastTileProps {
  classes: any;
  podcast: Podcast;
}

const PodcastTile = ({ classes, podcast }: PodcastTileProps) => (
  <Link to={{ pathname: `/podcast/${podcast.id}` }} rel="div">
    <div className={classes.tile} style={{ backgroundImage: `url(${podcast.cover['600']}` }} />
  </Link>
);

interface Props extends AppContextProps {
  classes: any;
}

interface State {
  podcasts: Podcast[];
}

class SubscriptionsPage extends React.Component<Props, State> {
  state: State = { podcasts: [] };

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

const ComponentWithContext = (props: any) => (
  <AppContext.Consumer>
    {({ setAppTitle }: any) => <SubscriptionsPage {...props} setAppTitle={setAppTitle} />}
  </AppContext.Consumer>
);

export default withStyles(styles)(ComponentWithContext);
