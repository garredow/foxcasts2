import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import JumpBackIcon from '@material-ui/icons/Replay10';
import JumpForwardIcon from '@material-ui/icons/Forward30';
import formatTime from '../utils/formatTime';
import { Episode, EpisodeExtended } from '../models';

const styles: any = {
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
  controls: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '20px',
  },
  playbackButton: {
    height: '78px',
    width: '78px',
    paddingTop: '6px',
  },
  playbackButtonIcon: {
    height: '64px',
    width: '64px',
  },
};

type OwnProps = {
  duration: number;
  progress: number;
  isPlaying: boolean;
  episode: EpisodeExtended;
  onSeek: (time: number) => void;
  onTogglePlaying: (ev: any) => void;
  onCloseEpisode: (ev: any) => void;
};

type FullPlayerProps = OwnProps & WithStyles;

class FullPlayer extends React.Component<FullPlayerProps, any> {
  handleBarClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    const progressBarWidth = ev.currentTarget.clientWidth;
    const clickedAt = ev.clientX - ev.currentTarget.offsetLeft;
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
          <Typography variant="h5">{episode.title}</Typography>
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
        <div className={classes.controls}>
          <IconButton className={classes.playbackButton} onClick={this.handleJumpBack}>
            <JumpBackIcon className={classes.playbackButtonIcon} />
          </IconButton>
          <IconButton className={classes.playbackButton} onClick={this.props.onTogglePlaying}>
            {isPlaying ? (
              <PauseIcon className={classes.playbackButtonIcon} />
            ) : (
              <PlayIcon className={classes.playbackButtonIcon} />
            )}
          </IconButton>
          <IconButton className={classes.playbackButton} onClick={this.handleJumpForward}>
            <JumpForwardIcon className={classes.playbackButtonIcon} />
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
