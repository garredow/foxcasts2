import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles, WithStyles, StyleRules } from '@material-ui/core/styles';

const styles: StyleRules = {
  played: {
    opacity: 0.5,
  },
};

interface Props extends WithStyles {
  primary: string;
  secondary: string;
  avatar?: string;
  isPlayed: boolean;
  onClick: (ev: any) => void;
}

const EpisodeRow = ({ avatar, primary, secondary, isPlayed, onClick, classes }: Props) => (
  <ListItem button onClick={onClick} className={isPlayed ? classes.played : ''}>
    {avatar && <Avatar src={avatar} />}
    <ListItemText primary={primary} secondary={secondary} />
  </ListItem>
);

export default withStyles(styles)(EpisodeRow);
