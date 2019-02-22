import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { ITunesPodcast } from '../models';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  coverArt: {
    borderRadius: '3px',
  },
});

type SearchResultProps = {
  podcast: ITunesPodcast;
  onClick: (ev: React.MouseEvent) => void;
};

function SearchResult({ podcast, onClick }: SearchResultProps) {
  const classes = useStyles();

  return (
    <ListItem button onClick={onClick}>
      <Avatar src={podcast.artworkUrl100} classes={{ root: classes.coverArt }} />
      <ListItemText primary={podcast.collectionName} secondary={podcast.artistName} />
    </ListItem>
  );
}

export default SearchResult;
