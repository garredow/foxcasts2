import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { ITunesPodcast } from '../models';

type SearchResultProps = {
  podcast: ITunesPodcast;
  onClick: (ev: React.MouseEvent) => void;
};

const SearchResult = ({ podcast, onClick }: SearchResultProps) => (
  <ListItem button onClick={onClick}>
    <Avatar src={podcast.artworkUrl100} />
    <ListItemText primary={podcast.collectionName} secondary={podcast.artistName} />
  </ListItem>
);

export default SearchResult;
