import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import PodcastService from '../services/podcastService';
import ProgressButton from './ProgressButton';
import { ITunesPodcast, Episode } from '../models';
import ApiService from '../services/apiService';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: any) => ({
  container: {
    padding: '15px',
    minHeight: '100vh',
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
  episodesList: {
    textAlign: 'center',
  },
}));

type PodcastPreviewProps = {
  podcast: ITunesPodcast;
  onSubscribe: () => void;
};

const podcastService = new PodcastService();
const apiService = new ApiService();

function PodcastPreview({ podcast, onSubscribe }: PodcastPreviewProps) {
  const [subscribing, setSubscribing] = useState<boolean>(false);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const classes = useStyles();

  useEffect(() => {
    const { collectionId, feedUrl } = podcast;
    podcastService.getPodcastById(collectionId).then(podcast => {
      setSubscribed(!!podcast);
    });
    apiService.getEpisodes(feedUrl).then(episodes => {
      setEpisodes(episodes.slice(0, 10));
    });
  }, []);

  const subscribe = (podcastId: number) => () => {
    setSubscribing(true);
    podcastService.subscribe(podcastId).then(() => {
      setSubscribing(false);
      setSubscribed(true);
    });
  };

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
            variant="contained"
            disabled={subscribing || subscribed}
            loading={subscribing}
            onClick={subscribe(podcast.collectionId)}
          >
            {subscribed ? 'Subscribed' : 'Subscribe'}
          </ProgressButton>
        </div>
        <Typography className={classes.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat tortor ut tempor
          ultrices. Donec in accumsan quam. Donec a orci sed odio rhoncus sodales sit amet nec
          ligula.
        </Typography>
        <div className={classes.episodesContainer}>
          <Typography variant="subtitle1">Recent Episodes</Typography>
          <List disablePadding={true} classes={{ root: classes.episodesList }}>
            {episodes.length === 0 && <CircularProgress />}
            {episodes.map(episode => (
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

export default PodcastPreview;
