import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles, WithStyles, StyleRules } from '@material-ui/core/styles';
import { EpisodeRowLayout } from '../models/Settings';

const styles: StyleRules = {
  played: {
    opacity: 0.5,
  },
  compactLine: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
};

type OwnProps = {
  primary: string;
  secondary: string;
  avatar?: string;
  isPlayed: boolean;
  layout: EpisodeRowLayout;
  onClick: (ev: any) => void;
};

type EpisodeRowProps = OwnProps & WithStyles;

const EpisodeRow = ({
  avatar,
  primary,
  secondary,
  isPlayed,
  layout = 'compact',
  onClick,
  classes,
}: EpisodeRowProps) => {
  const layoutStyles =
    layout === 'compact' ? { primary: classes.compactLine, secondary: classes.compactLine } : {};

  return (
    <ListItem button onClick={onClick} className={isPlayed ? classes.played : ''}>
      {avatar && <Avatar src={avatar} />}
      <ListItemText primary={primary} secondary={secondary} classes={layoutStyles} />
    </ListItem>
  );
};

export default withStyles(styles)(EpisodeRow);
