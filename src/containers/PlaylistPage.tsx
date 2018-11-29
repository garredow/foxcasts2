import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppContext from '../components/AppContext';
import { EpisodeExtended } from '../models';
import DatabaseService from '../services/databaseService';
import EpisodeList from '../components/EpisodeList';

const dbService = new DatabaseService();

const styles = {};

function getAppTitle(playlist: string) {
  let title;

  switch (playlist) {
    case 'recent':
      title = 'Most Recent';
      break;
    default:
      title = 'Playlist';
  }

  return title;
}

interface Props {
  setAppTitle: (title: string) => void;
  setActiveEpisode: (ev: any) => void;
  match: any;
}

interface State {
  episodes: EpisodeExtended[];
}

class PlaylistPage extends React.Component<Props, State> {
  state: State = { episodes: [] };

  async componentDidMount() {
    const playlist = this.props.match.params.playlist;
    this.props.setAppTitle(getAppTitle(playlist));

    const episodes = await dbService.getPlaylist(playlist);
    this.setState({ episodes });
  }

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

    return (
      <React.Fragment>
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
