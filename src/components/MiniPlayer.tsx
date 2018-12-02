import React from 'react';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { EpisodeExtended } from '../models';

const styles: any = {
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(55,55,55,1)',
    borderTop: '1px solid #212121',
  },
  progressBar: {
    height: '3px',
  },
  content: {
    display: 'flex',
    alignContent: 'center',
    padding: '3px',
  },
  cover: {
    height: '48px',
    width: '48px',
  },
  detailContainer: {
    flex: 1,
    maxWidth: 'calc(100vw - 106px)',
    padding: '0 10px',
    display: 'flex',
    flexDirection: 'column',
  },
};

type OwnProps = {
  episode: EpisodeExtended;
  isPlaying: boolean;
  duration: number;
  progress: number;
  onClick: (ev: React.MouseEvent<HTMLDivElement>) => void;
  onTogglePlaying: (ev: any) => void;
};

type MiniPlayerProps = OwnProps & WithStyles;

class MiniPlayer extends React.Component<MiniPlayerProps, any> {
  render() {
    const { classes, episode, progress, duration } = this.props;
    if (!episode) return null;

    return (
      <div className={classes.root} onClick={this.props.onClick}>
        <LinearProgress
          variant="determinate"
          value={Math.floor((progress / duration) * 100)}
          color="primary"
          className={classes.progressBar}
        />
        <div className={classes.content}>
          <img src={episode.cover['60']} alt="cover" className={classes.cover} />
          <div className={classes.detailContainer}>
            <Typography variant="subtitle1" noWrap>
              {episode.title}
            </Typography>
            <div>
              <Typography noWrap>{episode.author}</Typography>
            </div>
          </div>
          <IconButton onClick={this.props.onTogglePlaying}>
            {this.props.isPlaying ? <PauseIcon /> : <PlayIcon />}
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPlayer);
