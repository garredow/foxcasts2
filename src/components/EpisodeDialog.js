import React from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Slide } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EpisodeDetail from '../components/EpisodeDetail';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EpisodeDialog extends React.Component {
  render() {
    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.props.onClose}
        TransitionComponent={Transition}
        classes={{ paper: 'dialog-background' }}
      >
        <AppBar position="sticky" className="app-bar">
          <Toolbar>
            <IconButton onClick={this.props.onClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="padding-15">
          <EpisodeDetail episode={this.props.episode} onStream={this.props.onStream} />
        </div>
      </Dialog>
    );
  }
}

export default EpisodeDialog;
