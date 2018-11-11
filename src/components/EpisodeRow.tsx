import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

interface Props {
  primary: string;
  secondary: string;
  avatar?: string;
  onClick: (ev: any) => void;
}

const EpisodeRow = ({ avatar, primary, secondary, onClick }: Props) => (
  <ListItem button onClick={onClick}>
    {avatar && <Avatar src={avatar} />}
    <ListItemText primary={primary} secondary={secondary} />
  </ListItem>
);

export default EpisodeRow;
