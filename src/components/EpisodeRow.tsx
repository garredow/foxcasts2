import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/styles';
import { EpisodeRowLayout } from '../models/Settings';
import { styledBy } from '../utils/styledBy';

const useStyles = makeStyles({
  played: {
    opacity: 0.5,
  },
  compactLine: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  coverArt: {
    borderRadius: '3px',
    alignSelf: 'start',
    marginTop: styledBy('layout', {
      default: '4px',
      compact: '2px',
    }),
  },
});

type EpisodeRowProps = {
  primary: string;
  secondary: string;
  avatar?: string;
  isPlayed: boolean;
  layout: EpisodeRowLayout;
  onClick: (ev: any) => void;
};

function EpisodeRow(props: EpisodeRowProps) {
  const classes = useStyles(props);

  const layoutStyles =
    props.layout === 'compact'
      ? { primary: classes.compactLine, secondary: classes.compactLine }
      : {};

  return (
    <ListItem button onClick={props.onClick} className={props.isPlayed ? classes.played : ''}>
      {props.avatar && <Avatar src={props.avatar} classes={{ root: classes.coverArt }} />}
      <ListItemText primary={props.primary} secondary={props.secondary} classes={layoutStyles} />
    </ListItem>
  );
}

export default EpisodeRow;
