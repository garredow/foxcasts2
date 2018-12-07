import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, WithStyles, Theme } from '@material-ui/core';

const styles: any = (theme: Theme) => ({
  root: {
    position: 'relative',
  },
  cover: {
    position: 'absolute',
    top: '4px',
    left: '4px',
    overflow: 'hidden',
    borderRadius: '100%',
    height: '42px',
    width: '42px',
    border: `1px solid ${theme.palette.primary.main}`,
  },
  progress: {
    height: '50px !important',
    width: '50px !important',
  },
});

type OwnProps = {
  progress: number;
  episodeCover?: string;
};
type PlayerButtonProps = OwnProps & WithStyles;

const PlayerButton = ({ classes, progress, episodeCover }: PlayerButtonProps) => (
  <div className={classes.root}>
    <img src={episodeCover} alt="" className={classes.cover} />
    <CircularProgress variant="static" value={progress} className={classes.progress} />
  </div>
);

export default withStyles(styles)(PlayerButton);
