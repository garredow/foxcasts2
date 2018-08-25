import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, ButtonBase, Button, LinearProgress, IconButton } from '@material-ui/core';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Replay10 as JumpBackIcon,
  Forward30 as JumpForwardIcon,
} from '@material-ui/icons';
import formatTime from '../utils/formatTime';

const styles = {
  root: {
    textAlign: 'center',
    padding: '15px',
  },
  detailContainer: {
    marginBottom: '30px',
  },
  cover: {
    width: '100%',
    maxWidth: '300px',
    padding: '15px 15px 25px 15px',
  },
  progressContainer: {
    marginBottom: '20px',
  },
  times: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
};

class FullPlayer extends React.Component {
  handleBarClick = ev => {
    const progressBarWidth = ev.target.clientWidth;
    const clickedAt = ev.clientX - ev.target.offsetLeft;
    const percentage = clickedAt / progressBarWidth;
    const newTime = this.props.duration * percentage;

    this.props.onSeek(newTime);
  };

  handleJumpBack = () => {
    const newTime = this.props.progress - 10;
    this.props.onSeek(newTime > 0 ? newTime : 0);
  };

  handleJumpForward = () => {
    const newTime = this.props.progress + 30;
    this.props.onSeek(newTime < this.props.duration ? newTime : this.props.duration);
  };

  render() {
    const { classes, episode, progress, duration, isPlaying } = this.props;

    if (!episode) return null;

    return (
      <div className={classes.root}>
        <div className={classes.detailContainer}>
          <img className={classes.cover} src={episode.cover['600']} alt={episode.title} />
          <Typography variant="headline">{episode.title}</Typography>
        </div>
        <div className={classes.progressContainer}>
          <LinearProgress
            variant="determinate"
            value={Math.floor((progress / duration) * 100)}
            onClick={this.handleBarClick}
          />
          <div className={classes.times}>
            <Typography>{formatTime(progress)}</Typography>
            <Typography>-{formatTime(duration - progress)}</Typography>
          </div>
        </div>
        <div className="controls">
          <IconButton onClick={this.handleJumpBack}>
            <JumpBackIcon />
          </IconButton>
          <IconButton onClick={this.props.onTogglePlaying}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </IconButton>
          <IconButton onClick={this.handleJumpForward}>
            <JumpForwardIcon />
          </IconButton>
        </div>
        <Button variant="outlined" color="secondary" onClick={this.props.onCloseEpisode}>
          Stop Playback
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(FullPlayer);