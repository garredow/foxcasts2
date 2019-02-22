import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
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
}));

type PlayerButtonProps = {
  progress: number;
  episodeCover?: string;
};

function PlayerButton({ progress, episodeCover }: PlayerButtonProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={episodeCover} alt="" className={classes.cover} />
      <CircularProgress variant="static" value={progress} className={classes.progress} />
    </div>
  );
}

export default PlayerButton;
