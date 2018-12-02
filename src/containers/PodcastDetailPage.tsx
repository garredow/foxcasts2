import React from 'react';
import PodcastService from '../services/podcastService';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import ConfirmDialog from '../components/ConfirmDialog';
import { Podcast, EpisodeExtended, AppContextProps } from '../models';
import AppContext from '../components/AppContext';
import EpisodeList from '../components/EpisodeList';
import DatabaseService from '../services/databaseService';

const podcastService = new PodcastService();
const dbService = new DatabaseService();

const styles: any = {
  root: {
    padding: '10px',
    position: 'relative',
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(50px)',
    opacity: 0.2,
    zIndex: -1,
  },
  detailContainer: {
    textAlign: 'center',
  },
  cover: {
    width: '100%',
    maxWidth: '300px',
    padding: '15px 15px 25px 15px',
  },
  actionsContainer: {
    textAlign: 'center',
    margin: '10px 0 20px 0',
  },
};

type OwnProps = {
  match: any;
};

type PodcastDetailPageProps = OwnProps & WithStyles & AppContextProps;

type PodcastDetailPageState = {
  podcast?: Podcast;
  confirmDialogOpen: boolean;
};

class PodcastDetailPage extends React.Component<PodcastDetailPageProps, PodcastDetailPageState> {
  state: PodcastDetailPageState = {
    confirmDialogOpen: false,
  };

  async componentDidMount() {
    this.props.setAppTitle('');

    const podcastId = this.props.match.params.id;
    if (!podcastId) {
      return;
    }

    const podcast = await podcastService.getPodcastById(podcastId, true);
    this.setState({ podcast });
  }

  promptConfirm = () => {
    this.setState({ confirmDialogOpen: true });
  };

  onDialogClose = (result: 'confirm' | 'cancel') => {
    if (result === 'confirm' && this.state.podcast) {
      podcastService.unsubscribe(this.state.podcast.id);
    }
    this.setState({ confirmDialogOpen: false });
  };

  handleStream = (episode: EpisodeExtended) => {
    this.props.setActiveEpisode(episode);
  };

  handleTogglePlayed = (episodeId: number) => {
    if (!this.state.podcast || !this.state.podcast.episodes) return;

    const episode = this.state.podcast.episodes.find(e => e.id === episodeId);

    if (!episode) return;

    const isPlayed = episode.progress >= episode.duration;
    const progress = isPlayed ? 0 : episode.duration;

    dbService.updateEpisode(episodeId, { progress });

    const updatedEpisodes = this.state.podcast.episodes.map(e => {
      if (e.id === episodeId) {
        e.progress = progress;
      }
      return e;
    });

    const updatedPodcast = Object.assign({}, this.state.podcast, { episodes: updatedEpisodes });

    this.setState({ podcast: updatedPodcast });
  };

  render() {
    const { classes } = this.props;
    const podcast = this.state.podcast;

    if (!podcast) return null;

    if (!podcast.episodes) podcast.episodes = [];

    const episodes: EpisodeExtended[] = podcast.episodes.map(episode => ({
      ...episode,
      cover: podcast.cover,
    }));

    return (
      <div className={classes.root}>
        <div
          className={classes.backdrop}
          style={{ backgroundImage: `url(${podcast.cover['600']})` }}
        />
        <div className={classes.detailContainer}>
          <img className={classes.cover} src={podcast.cover['600']} alt={podcast.title} />
          <Typography variant="h5">{podcast.title}</Typography>
          <Typography variant="subtitle1">{podcast.author}</Typography>
        </div>
        <div>
          <EpisodeList
            episodes={episodes}
            listType="podcast"
            onStream={this.handleStream}
            onTogglePlayed={this.handleTogglePlayed}
          />
        </div>
        <div className={classes.actionsContainer}>
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

const ComponentWithContext = (props: PodcastDetailPageProps) => (
  <AppContext.Consumer>
    {({ setAppTitle, setActiveEpisode }: any) => (
      <PodcastDetailPage {...props} setAppTitle={setAppTitle} setActiveEpisode={setActiveEpisode} />
    )}
  </AppContext.Consumer>
);

export default withStyles(styles)(ComponentWithContext);
