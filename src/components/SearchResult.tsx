import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { ITunesPodcast } from '../models';

interface Props {
  podcast: ITunesPodcast;
  onClick: (ev: React.MouseEvent) => void;
}

const SearchResult = ({ podcast, onClick }: Props) => (
  <ListItem button onClick={onClick}>
    <Avatar src={podcast.artworkUrl100} />
    <ListItemText primary={podcast.collectionName} secondary={podcast.artistName} />
  </ListItem>
);

export default SearchResult;
