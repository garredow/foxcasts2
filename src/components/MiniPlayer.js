import React from 'react';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(55,55,55,1)',
    padding: '5px',
    display: 'flex',
    alignContent: 'center',
    borderTop: '2px solid #aaa',
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

class MiniPlayer extends React.Component {
  render() {
    const { classes, episode } = this.props;
    if (!episode) return null;

    return (
      <div className={classes.root} onClick={this.props.onClick}>
        <img src={episode.cover['60']} alt="cover" className={classes.cover} />
        <div className={classes.detailContainer}>
          <Typography variant="subheading" noWrap>
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
    );
  }
}

export default withStyles(styles)(MiniPlayer);
