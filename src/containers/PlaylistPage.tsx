import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PodcastService from '../services/podcastService';
import AppContext from '../components/AppContext';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Episode } from '../models';

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

interface EpisodeRowProps {
  episode: Episode;
  onClick: (ev: any) => void;
  setAppTitle: (title: string) => void;
}

const EpisodeRow = ({ episode, onClick }: EpisodeRowProps) => (
  <ListItem button onClick={onClick}>
    {/* <Avatar src={episode.} */}
    <ListItemText primary={episode.title} secondary={episode.author} />
  </ListItem>
);

interface Props {
  setAppTitle: (title: string) => void;
  setActiveEpisode: (ev: any) => void;
  match: any;
}

interface State {
  episodes: Episode[];
}

class PlaylistPage extends React.Component<Props, State> {
  state = { episodes: [] };

  async componentDidMount() {
    const playlist = this.props.match.params.playlist;
    this.props.setAppTitle(getAppTitle(playlist));

    // Get episodes
  }

  render() {
    return <div>Playlist {this.props.match.params.playlist}</div>;
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
