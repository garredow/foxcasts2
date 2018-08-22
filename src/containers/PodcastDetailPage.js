import React from 'react';
import PodcastService from '../services/podcastService';
import { Typography } from '@material-ui/core';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';
import ConfirmDialog from 'components/ConfirmDialog';
import AppContext from '../components/AppContext';
import './PodcastDetailPage.css';

const podcastService = new PodcastService();

const EpisodeRow = ({ episode, onClick }) => (
  <ListItem button>
    <ListItemText primary={episode.title} secondary={episode.date} />
  </ListItem>
);

class PodcastDetailPage extends React.Component {
  state = {
    podcast: null,
    confirmDialogOpen: false,
  };

  async componentDidMount() {
    this.props.setAppTitle('');

    if (!this.props.match.params.id) {
      return;
    }

    const podcastId = this.props.match.params.id;
    const podcast = await podcastService.getPodcastById(podcastId, true);
    this.setState({ podcast });
  }

  promptConfirm = () => {
    this.setState({ confirmDialogOpen: true });
  };

  onDialogClose = result => {
    if (result === 'confirm') {
      podcastService.unsubscribe(this.state.podcast.id);
    }
    this.setState({ confirmDialogOpen: false });
  };

  render() {
    const podcast = this.state.podcast;

    if (!podcast) return null;

    return (
      <div className="page-container podcast-detail-page">
        <div className="background" style={{ backgroundImage: `url(${podcast.cover['600']})` }} />
        <div className="detail-container">
          <img className="cover" src={podcast.cover['600']} alt={podcast.title} />
          <Typography variant="headline">{podcast.title}</Typography>
          <Typography variant="subheading">{podcast.author}</Typography>
        </div>
        <div className="episodes-container">
          <List>
            {podcast.episodes.map(episode => (
              <EpisodeRow episode={episode} key={episode.id} />
            ))}
          </List>
        </div>
        <div className="actions-container">
          <Button variant="outlined" color="secondary" onClick={this.promptConfirm}>
            Unsubscribe
          </Button>
        </div>
        <ConfirmDialog
          title="Confirm"
          body="Are you sure you want to unsubscribe?"
          open={this.state.confirmDialogOpen}
          onClose={this.onDialogClose}
        />
      </div>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {({ setAppTitle }) => <PodcastDetailPage {...props} setAppTitle={setAppTitle} />}
  </AppContext.Consumer>
);
