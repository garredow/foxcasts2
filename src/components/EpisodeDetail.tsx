import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import formatTime from '../utils/formatTime';
import { Episode } from '../models';
import sanitizeHtml from 'sanitize-html';

const styles: any = (theme: Theme) => ({
  container: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  actions: {
    marginBottom: '20px',
    '& button': {
      display: 'block',
      margin: '0 auto 10px auto',
    },
  },
  details: {
    color: theme.palette.text.primary,
    '& a': {
      color: (theme.palette.secondary as any)[200],
    },
  },
});

type OwnProps = {
  episode: Episode;
  onResume: (event: any) => void;
  onPlayFromBeginning: (event: any) => void;
  onTogglePlayed: (event: any) => void;
};

type EpisodeDetailProps = OwnProps & WithStyles;

class EpisodeDetail extends React.Component<EpisodeDetailProps, any> {
  render() {
    const { classes, episode } = this.props;

    if (!episode) return null;

    return (
      <React.Fragment>
        <div className={classes.container}>
          <Typography variant="h6">{episode.title}</Typography>
          <Typography variant="subtitle1">{episode.author}</Typography>
        </div>
        <div className={classes.actions}>
          <Button variant="outlined" onClick={this.props.onPlayFromBeginning}>
            {episode.progress > 0 ? 'Play From Beginning' : 'Play'}
          </Button>
          {episode.progress > 0 && episode.progress < episode.duration && (
            <Button variant="outlined" onClick={this.props.onResume}>
              {`Resume at ${formatTime(episode.progress)}`}
            </Button>
          )}
          <Button variant="outlined" onClick={this.props.onTogglePlayed}>
            Mark as {episode.progress >= episode.duration ? 'Unplayed' : 'Played'}
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
