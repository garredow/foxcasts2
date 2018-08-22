import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core';

class ConfirmDialog extends React.Component {
  handleCancel = () => {
    this.props.onClose('cancel');
  };
  handleOk = () => {
    this.props.onClose('confirm');
  };
  render() {
    return (
      <Dialog maxWidth="xs" open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>{this.props.title || 'Confirm'}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{this.props.body}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel}>Cancel</Button>
          <Button onClick={this.handleOk}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmDialog;
