import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

type OwnProps = {
  variant: 'text' | 'flat' | 'outlined' | 'contained' | 'raised' | 'fab' | 'extendedFab';
  disabled: boolean;
  loading: boolean;
  onClick: (ev: React.MouseEvent) => void;
  children?: React.ReactNode;
};

type ProgressButtonProps = OwnProps & WithStyles;

const ProgressButton = (props: ProgressButtonProps) => (
  <div className={props.classes.root}>
    <Button variant={props.variant || 'outlined'} disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </Button>
    {props.loading && <CircularProgress size={24} className={props.classes.progress} />}
  </div>
);

export default withStyles(styles)(ProgressButton);
