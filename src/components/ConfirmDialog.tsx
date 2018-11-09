import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface Props {
  onClose: ((event: any) => void);
  open: boolean;
  title: string;
  body: string;
}

class ConfirmDialog extends React.Component<Props, any> {
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
