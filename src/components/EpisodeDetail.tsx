import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles, Theme } from '@material-ui/core/styles';
import formatTime from '../utils/formatTime';
import { Episode } from '../models';
import sanitizeHtml from 'sanitize-html';

const styles: any = (theme: Theme) => ({
  container: {
    textAlign: 'center',
    marginBottom: '15px',
  },
  details: {
    color: theme.palette.text.primary,
    '& a': {
      color: theme.palette.secondary.main,
    },
  },
});

interface Props {
  classes: any;
  episode: Episode;
  onStream: (event: any) => void;
}

class EpisodeDetail extends React.Component<Props, any> {
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
        <div
          className={classes.details}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(episode.description) }}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EpisodeDetail);
