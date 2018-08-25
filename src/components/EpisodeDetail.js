import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import formatTime from '../utils/formatTime';

const styles = {
  container: {
    textAlign: 'center',
    marginBottom: '15px',
  },
};

class EpisodeDetail extends React.Component {
  render() {
    const { classes, episode } = this.props;

    if (!episode) return null;

    return (
      <React.Fragment>
        <div className={classes.container}>
          <Typography variant="title">{episode.title}</Typography>
          <Typography variant="subheading">{episode.author}</Typography>
        </div>
        <div className={classes.container}>
          <Button variant="outlined" onClick={this.props.onStream}>
            {episode.progress > 0 ? `Resume at ${formatTime(episode.progress)}` : 'Play'}
          </Button>
        </div>
        <Typography variant="body1">{episode.subTitle}</Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(EpisodeDetail);
