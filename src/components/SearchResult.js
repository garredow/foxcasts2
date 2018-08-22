import React from 'react';
import { ListItem, ListItemText, Avatar } from '@material-ui/core';

const SearchResult = ({ podcast, onClick }) => (
  <ListItem button onClick={onClick}>
    <Avatar src={podcast.artworkUrl100} />
    <ListItemText primary={podcast.collectionName} secondary={podcast.artistName} />
  </ListItem>
);

export default SearchResult;
