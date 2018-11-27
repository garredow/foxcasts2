import React, { SyntheticEvent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import AudioPlayer from 'react-audio-player';
import PodcastService from '../services/podcastService';
import { EpisodeExtended } from '../models';
import MiniPlayer from '../components/MiniPlayer';
import FullPlayer from '../components/FullPlayer';
import { withStyles, WithStyles } from '@material-ui/core';

const podcastService = new PodcastService();

const styles: any = {
  backdrop: {
    background: 'red',
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
};

interface Props extends WithStyles {
  episode?: EpisodeExtended;
  onStopPlayback: () => void;
}

interface State {
  isPlaying: boolean;
  isSmallPlayer: boolean;
  progress: number;
  duration: number;
}

function Transition(props: Props) {
  return <Slide direction="up" {...props} />;
}

class Player extends React.Component<Props, State> {
  state = {
    isPlaying: false,
    isSmallPlayer: true,
    progress: 0,
    duration: 0,
  };

  audioRef: any;

  componentDidUpdate({ episode: previousEpisode }: any) {
    const episode = this.props.episode;
    if (!episode) return;

    const isNewEpisode = !previousEpisode || previousEpisode.id !== episode.id;

    if (isNewEpisode) {
      const progress = episode.progress;
      this.audioRef.audioEl.currentTime = progress;
      this.setState({
        isSmallPlayer: true,
        isPlaying: false,
        progress,
        duration: episode.duration,
      });
    }
  }

  resetPlayerState = () => {
    this.setState({
      isSmallPlayer: true,
      isPlaying: false,
      progress: 0,
      duration: 0,
    });
  };

  handleTogglePlaying = (ev: MouseEvent) => {
    ev.stopPropagation();

    const isPlaying = !this.state.isPlaying;
    this.setState({ isPlaying });
    isPlaying ? this.audioRef.audioEl.play() : this.audioRef.audioEl.pause();
  };

  handleCloseEpisode = () => {
    this.resetPlayerState();
    this.props.onStopPlayback();
  };

  openFullView = () => {
    this.setState({ isSmallPlayer: false });
  };

  onCloseFullPlayer = () => {
    this.setState({ isSmallPlayer: true });
  };

  handleProgressChanged = (progress: number) => {
    if (!this.props.episode) return;

    progress = Math.ceil(progress);
    podcastService.updateEpisode(this.props.episode.id, { progress });

    this.setState({ progress });
  };

  handleLoadedMetadata = (ev: SyntheticEvent<HTMLAudioElement>) => {
    if (!this.props.episode) return;

    const progress = this.props.episode.progress || 0;
    const duration = Math.ceil(ev.currentTarget.duration);

    if (duration !== this.props.episode.duration) {
      podcastService.updateEpisode(this.props.episode.id, { duration });
    }

    this.setState({ progress, duration });
  };

  handleSeek = (newTime: number) => {
    this.setState({ progress: newTime });
    this.audioRef.audioEl.currentTime = newTime;
  };

  render() {
    const { classes, episode } = this.props;
    if (!episode) return null;

    return (
      <React.Fragment>
        <MiniPlayer
          episode={episode}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          duration={this.state.duration}
          onClick={this.openFullView}
          onTogglePlaying={this.handleTogglePlaying}
        />
        <Dialog
          fullScreen
          open={!this.state.isSmallPlayer}
          onClose={this.onCloseFullPlayer}
          TransitionComponent={Transition}
          classes={{ paper: 'dialog-background' }}
        >
          <div
            style={{ backgroundImage: `url('${episode.cover[600]}')` }}
            className={classes.backdrop}
          />
          <AppBar position="sticky" className="app-bar">
            <Toolbar>
              <IconButton onClick={this.onCloseFullPlayer}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {!this.state.isSmallPlayer && (
            <FullPlayer
              episode={episode}
              isPlaying={this.state.isPlaying}
              progress={this.state.progress}
              duration={this.state.duration}
              onCloseEpisode={this.handleCloseEpisode}
              onSeek={this.handleSeek}
              onTogglePlaying={this.handleTogglePlaying}
            />
          )}
        </Dialog>
        <AudioPlayer
          listenInterval={1000}
          onListen={this.handleProgressChanged}
          onLoadedMetadata={this.handleLoadedMetadata}
          src={episode.fileUrl}
          ref={(element: any) => {
            this.audioRef = element;
          }}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Player);
