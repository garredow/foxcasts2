import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AppContext from '../components/AppContext';
import { EpisodeExtended, AppContextProps } from '../models';
import DatabaseService from '../services/databaseService';
import EpisodeList from '../components/EpisodeList';
import { Typography } from '@material-ui/core';

const dbService = new DatabaseService();

const styles: any = {
  noEpisodesMessage: {
    padding: '30px 15px',
    textAlign: 'center',
  },
};

function getAppTitle(playlist: string) {
  let title;

  switch (playlist) {
    case 'recent':
      title = 'Most Recent';
      break;
    case 'inProgress':
      title = 'In Progress';
      break;
    default:
      title = 'Playlist';
  }

  return title;
}

type OwnProps = {
  match: any;
};

type PlaylistPageProps = OwnProps & WithStyles & AppContextProps;

type PlaylistPageState = {
  episodes: EpisodeExtended[];
};

class PlaylistPage extends React.Component<PlaylistPageProps, PlaylistPageState> {
  state: PlaylistPageState = { episodes: [] };

  async componentDidMount() {
    const playlist = this.props.match.params.playlist;
    this.props.setAppTitle(getAppTitle(playlist));

    this.getEpisodes(playlist);
  }

  componentDidUpdate(prevProps: PlaylistPageProps) {
    const playlist = this.props.match.params.playlist;
    if (prevProps.match.params.playlist !== playlist) {
      this.props.setAppTitle(getAppTitle(playlist));
      this.getEpisodes(playlist);
    }
  }

  getEpisodes = async (playlist: string) => {
    const episodes = await dbService.getPlaylist(playlist);
    this.setState({ episodes });
  };

  handleStream = (episode: EpisodeExtended) => {
    this.props.setActiveEpisode(episode);
  };

  handleTogglePlayed = (episodeId: number) => {
    const episode = this.state.episodes.find(e => e.id === episodeId);

    if (!episode) return;

    const isPlayed = episode.progress >= episode.duration;
    const progress = isPlayed ? 0 : episode.duration;

    dbService.updateEpisode(episodeId, { progress });

    const updatedEpisodes = this.state.episodes.map(e => {
      if (e.id === episodeId) {
        e.progress = progress;
      }
      return e;
    });

    this.setState({ episodes: updatedEpisodes });
  };

  render() {
    const { episodes = [] } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        {episodes.length === 0 && (
          <Typography className={classes.noEpisodesMessage}>No episodes to display.</Typography>
        )}
        <EpisodeList
          episodes={episodes}
          listType="playlist"
          onStream={this.handleStream}
          onTogglePlayed={this.handleTogglePlayed}
        />
      </React.Fragment>
    );
  }
}

const ComponentWithContext = (props: any) => (
  <AppContext.Consumer>
    {({ setAppTitle, setActiveEpisode }: any) => (
      <PlaylistPage {...props} setAppTitle={setAppTitle} setActiveEpisode={setActiveEpisode} />
    )}
  </AppContext.Consumer>
);

export default withStyles(styles)(ComponentWithContext);
