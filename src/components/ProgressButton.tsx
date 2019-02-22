import React from 'react';
import { Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

type ProgressButtonProps = {
  variant?: 'text' | 'flat' | 'outlined' | 'contained' | 'raised' | 'fab' | 'extendedFab';
  color?: 'inherit' | 'primary' | 'secondary' | 'default';
  disabled?: boolean;
  loading?: boolean;
  onClick: (ev: React.MouseEvent) => void;
  children?: React.ReactNode;
};

function ProgressButton(props: ProgressButtonProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant={props.variant || 'outlined'}
        color={props.color || 'primary'}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.children}
      </Button>
      {props.loading && <CircularProgress size={24} className={classes.progress} />}
    </div>
  );
}

export default ProgressButton;
