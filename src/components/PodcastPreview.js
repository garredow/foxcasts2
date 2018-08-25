import React from 'react';
import { Typography, Button } from '@material-ui/core';
import LoadingIcon from '@material-ui/icons/RotateRight';
import PodcastService from '../services/podcastService';

const podcastService = new PodcastService();

const styles = {
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
};

class PodcastPreview extends React.Component {
  state = { subscribing: false, subscribed: false };

  componentDidMount() {
    podcastService.getPodcastById(this.props.podcast.collectionId).then(podcast => {
      this.setState({ subscribed: !!podcast });
    });
  }

  subscribe = podcastId => () => {
    this.setState({ subscribing: true });
    podcastService.subscribe(podcastId).then(() => {
      this.setState({ subscribing: false, subscribed: true });
    });
  };

  render() {
    const { podcast } = this.props;
    return (
      <React.Fragment>
        <div style={styles.container}>
          <img src={podcast.artworkUrl600} style={styles.cover} alt={podcast.collectionName} />
          <Typography variant="title">{podcast.collectionName}</Typography>
          <Typography variant="subheading">{podcast.artistName}</Typography>
          <div style={styles.actions}>
            <Button
              variant="outlined"
              onClick={this.subscribe(podcast.collectionId)}
              disabled={this.state.subscribing || this.state.subscribed}
            >
              {this.state.subscribed ? 'Subscribed' : 'Subscribe'}
              {this.state.subscribing && <LoadingIcon className="spin" />}
            </Button>
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

export default PodcastPreview;
