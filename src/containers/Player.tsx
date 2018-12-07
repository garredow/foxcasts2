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
import SettingsContext from '../components/SettingsContext';
import { SettingsWithMethods } from '../models/Settings';

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

type OwnProps = {
  episode?: EpisodeExtended;
  onStopPlayback: () => void;
  fullPlayerOpen?: boolean;
  onCloseFulllPlayer: () => void;
};

type PlayerProps = OwnProps & WithStyles;

type PlayerState = {
  isPlaying: boolean;
  isSmallPlayer: boolean;
  progress: number;
  duration: number;
};

function Transition(props: PlayerProps) {
  return <Slide direction="up" {...props} />;
}

class Player extends React.Component<PlayerProps, PlayerState> {
  static contextType = SettingsContext;
  context!: SettingsWithMethods;

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
      this.audioRef.audioEl.currentTime = episode.progress;
      this.setState(
        {
          isSmallPlayer: true,
          isPlaying: false,
          progress: episode.progress,
          duration: episode.duration,
        },
        () => {
          this.handleTogglePlaying();
        }
      );
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

  handleTogglePlaying = (ev?: MouseEvent) => {
    if (ev) {
      ev.stopPropagation();
    }

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
    if (this.props.onCloseFulllPlayer) {
      this.props.onCloseFulllPlayer();
    }
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

  handleEpisodeEnded = () => {
    if (!this.props.episode) return;

    const progress = this.props.episode.duration;

    this.setState({
      progress,
      isPlaying: false,
    });

    this.audioRef.audioEl.pause();
    podcastService.updateEpisode(this.props.episode.id, { progress });
  };

  handleSeek = (newTime: number) => {
    this.setState({ progress: newTime });
    this.audioRef.audioEl.currentTime = newTime;
  };

  render() {
    const { classes, episode } = this.props;
    const disableSmallPlayer = this.context.navLayout === 'bottom';
    if (!episode) return null;

    return (
      <React.Fragment>
        {!disableSmallPlayer && this.state.isSmallPlayer && (
          <MiniPlayer
            episode={episode}
            isPlaying={this.state.isPlaying}
            progress={this.state.progress}
            duration={this.state.duration}
            onClick={this.openFullView}
            onTogglePlaying={this.handleTogglePlaying}
          />
        )}
        <Dialog
          fullScreen
          open={!this.state.isSmallPlayer || this.props.fullPlayerOpen === true}
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
          {(!this.state.isSmallPlayer || this.props.fullPlayerOpen) && (
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
          onEnded={this.handleEpisodeEnded}
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
