import React from 'react';
import { IconButton, Dialog, Slide, AppBar, Toolbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AudioPlayer from 'react-audio-player';
import MiniPlayer from 'components/MiniPlayer';
import FullPlayer from 'components/FullPlayer';
import PodcastService from '../services/podcastService';

const podcastService = new PodcastService();

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Player extends React.Component {
  state = {
    isPlaying: false,
    isSmallPlayer: true,
    progress: 0,
    duration: 0,
  };

  componentDidUpdate(prevProps) {
    const isNewEpisode =
      (prevProps.episode && prevProps.episode.id) !== (this.props.episode && this.props.episode.id);

    if (isNewEpisode) {
      const progress = this.props.episode.progress;
      this.audioRef.audioEl.currentTime = progress;
      this.setState({
        isSmallPlayer: true,
        isPlaying: false,
        progress,
        duration: this.props.episode.duration,
      });
    }
  }

  handleTogglePlaying = ev => {
    ev.stopPropagation();

    const isPlaying = !this.state.isPlaying;
    this.setState({ isPlaying });
    isPlaying ? this.audioRef.audioEl.play() : this.audioRef.audioEl.pause();
  };

  handleCloseEpisode = () => {
    this.props.onStopPlayback();
    this.setState({
      isSmallPlayer: true,
      isPlaying: false,
    });
  };

  openFullView = () => {
    this.setState({ isSmallPlayer: false });
  };

  onCloseFullPlayer = () => {
    this.setState({ isSmallPlayer: true });
  };

  handleProgressChanged = progress => {
    progress = Math.ceil(progress);
    podcastService.updateEpisode(this.props.episode.id, { progress });

    if (!this.state.isSmallPlayer) {
      this.setState({ progress });
    }
  };

  handleLoadedMetadata = ev => {
    const progress = this.props.episode.progress || 0;
    const duration = Math.ceil(ev.target.duration);

    if (duration !== this.props.episode.duration) {
      podcastService.updateEpisode(this.props.episode.id, { duration });
    }

    this.setState({ progress, duration });
  };

  handleSeek = newTime => {
    this.setState({ progress: newTime });
    this.audioRef.audioEl.currentTime = newTime;
  };

  render() {
    const episode = this.props.episode;
    if (!episode) return null;

    return (
      <React.Fragment>
        <MiniPlayer
          episode={episode}
          isPlaying={this.state.isPlaying}
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
          ref={element => {
            this.audioRef = element;
          }}
        />
      </React.Fragment>
    );
  }
}

export default Player;
