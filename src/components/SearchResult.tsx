import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { ITunesPodcast } from '../models';
import { StyleRules, withStyles, WithStyles } from '@material-ui/core/styles';

const styles: StyleRules = {
  coverArt: {
    borderRadius: '3px',
  },
};

type OwnProps = {
  podcast: ITunesPodcast;
  onClick: (ev: React.MouseEvent) => void;
};

type SearchResultProps = OwnProps & WithStyles;

const SearchResult = ({ classes, podcast, onClick }: SearchResultProps) => (
  <ListItem button onClick={onClick}>
    <Avatar src={podcast.artworkUrl100} classes={{ root: classes.coverArt }} />
    <ListItemText primary={podcast.collectionName} secondary={podcast.artistName} />
  </ListItem>
);

export default withStyles(styles)(SearchResult);
