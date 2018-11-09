import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles: any = (theme: any) => ({
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
});

interface Props {
  classes: any;
  variant: 'text' | 'flat' | 'outlined' | 'contained' | 'raised' | 'fab' | 'extendedFab';
  disabled: boolean;
  loading: boolean;
  onClick: (ev: React.MouseEvent) => void;
  children?: React.ReactNode;
}

const ProgressButton = (props: Props) => (
  <div className={props.classes.root}>
    <Button variant={props.variant || 'outlined'} disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </Button>
    {props.loading && <CircularProgress size={24} className={props.classes.progress} />}
  </div>
);

export default withStyles(styles)(ProgressButton);
