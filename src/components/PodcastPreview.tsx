import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PodcastService from '../services/podcastService';
import ProgressButton from './ProgressButton';
import { ITunesPodcast } from '../models';

const podcastService = new PodcastService();

const styles: any = (theme: any) => ({
  container: {
    padding: '15px',
    maxHeight: '75vh',
  },
  header: {
    padding: '5px',
  },
  actions: {
    padding: '10px',
    textAlign: 'center',
  },
  cover: {
    width: '100%',
  },
});

interface Props {
  classes: any;
  podcast: ITunesPodcast;
  onSubscribe: () => void;
}

interface State {
  subscribing: boolean;
  subscribed: boolean;
}

class PodcastPreview extends React.Component<Props, State> {
  state = { subscribing: false, subscribed: false };

  componentDidMount() {
    podcastService.getPodcastById(this.props.podcast.collectionId).then(podcast => {
      this.setState({ subscribed: !!podcast });
    });
  }

  subscribe = (podcastId: number) => () => {
    this.setState({ subscribing: true });
    podcastService.subscribe(podcastId).then(() => {
      this.setState({ subscribing: false, subscribed: true });
    });
  };

  render() {
    const { classes, podcast } = this.props;
    return (
      <React.Fragment>
        <div className={classes.container}>
          <img src={podcast.artworkUrl600} className={classes.cover} alt={podcast.collectionName} />
          <Typography variant="title">{podcast.collectionName}</Typography>
          <Typography variant="subheading">{podcast.artistName}</Typography>
          <div className={classes.actions}>
            <ProgressButton
              variant="outlined"
              disabled={this.state.subscribing || this.state.subscribed}
              loading={this.state.subscribing}
              onClick={this.subscribe(podcast.collectionId)}
            >
              {this.state.subscribed ? 'Subscribed' : 'Subscribe'}
            </ProgressButton>
          </div>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat tortor ut tempor
            ultrices. Donec in accumsan quam. Donec a orci sed odio rhoncus sodales sit amet nec
            ligula.
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PodcastPreview);
