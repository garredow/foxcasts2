import React from 'react';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Theme } from '@material-ui/core/styles';
import { EpisodeExtended } from '../models';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.background.default}`,
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
}));

type MiniPlayerProps = {
  episode: EpisodeExtended;
  isPlaying: boolean;
  duration: number;
  progress: number;
  onClick: (ev: React.MouseEvent<HTMLDivElement>) => void;
  onTogglePlaying: (ev: any) => void;
};

function MiniPlayer(props: MiniPlayerProps) {
  const { episode, progress, duration } = props;
  const classes = useStyles();
  if (!episode) return null;

  return (
    <div className={classes.root} onClick={props.onClick}>
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
        <IconButton onClick={props.onTogglePlaying}>
          {props.isPlaying ? <PauseIcon /> : <PlayIcon />}
        </IconButton>
      </div>
    </div>
  );
}

export default MiniPlayer;
