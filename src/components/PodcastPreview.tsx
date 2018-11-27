import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PodcastService from '../services/podcastService';
import ProgressButton from './ProgressButton';
import { ITunesPodcast, Episode } from '../models';
import ApiService from '../services/apiService';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles: any = (theme: any) => ({
  container: {
    padding: '15px',
    height: '85vh',
    display: 'grid',
    gridGap: '15px',
    gridAutoRows: 'min-content',
    gridTemplateColumns: '100px auto',
    gridTemplateAreas: `
      'cover titleArtist'
      'description description'
      'actions actions'
      'episodesContainer episodesContainer'
    `,
    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: `
        'cover episodesContainer'
        'titleArtist episodesContainer'
        'description episodesContainer'
        'actions episodesContainer'
        '... episodesContainer'
      `,
    },
  },
  detailContainer: {
    textAlign: 'center',
  },
  header: {
    padding: '5px',
  },
  actions: {
    textAlign: 'center',
    gridArea: 'actions',
    [theme.breakpoints.up('lg')]: {
      textAlign: 'left',
    },
  },
  cover: {
    gridArea: 'cover',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
  },
  titleArtist: {
    gridArea: 'titleArtist',
  },
  description: {
    gridArea: 'description',
  },
  episodesContainer: {
    gridArea: 'episodesContainer',
  },
});

interface Props {
  classes: any;
  podcast: ITunesPodcast;
  onSubscribe: () => void;
}

interface State {
  subscribing: boolean;
  subscribed: boolean;
  episodes: Episode[];
}

class PodcastPreview extends React.Component<Props, State> {
  state: State = { subscribing: false, subscribed: false, episodes: [] };

  private podcastService = new PodcastService();
  private apiService = new ApiService();

  componentDidMount() {
    const { collectionId, feedUrl } = this.props.podcast;
    this.podcastService.getPodcastById(collectionId).then(podcast => {
      this.setState({ subscribed: !!podcast });
    });
    this.apiService.getEpisodes(feedUrl).then(episodes => {
      this.setState({ episodes: episodes.slice(0, 10) });
    });
  }

  subscribe = (podcastId: number) => () => {
    this.setState({ subscribing: true });
    this.podcastService.subscribe(podcastId).then(() => {
      this.setState({ subscribing: false, subscribed: true });
    });
  };

  render() {
    const { classes, podcast } = this.props;
    return (
      <React.Fragment>
        <div className={classes.container}>
          <img src={podcast.artworkUrl600} className={classes.cover} alt={podcast.collectionName} />
          <div className={classes.titleArtist}>
            <Typography variant="h6">{podcast.collectionName}</Typography>
            <Typography variant="subtitle1">{podcast.artistName}</Typography>
          </div>
          <div className={classes.actions}>
            <ProgressButton
              variant="outlined"
              disabled={this.state.subscribing || this.state.subscribed}
              loading={this.state.subscribing}
              onClick={this.subscribe(podcast.collectionId)}
            >
              {this.state.subscribed ? 'Subscribed' : 'Subscribe'}
            </ProgressButton>
          </div>
          <Typography className={classes.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat tortor ut tempor
            ultrices. Donec in accumsan quam. Donec a orci sed odio rhoncus sodales sit amet nec
            ligula.
          </Typography>
          <div className={classes.episodesContainer}>
            <Typography variant="subtitle1">Recent Episodes</Typography>
            <List disablePadding={true}>
              {this.state.episodes.map(episode => (
                <ListItem key={episode.guid} disableGutters={true}>
                  <ListItemText primary={episode.title} secondary={episode.subTitle} />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PodcastPreview);
