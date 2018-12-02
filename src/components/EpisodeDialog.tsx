import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import EpisodeDetail from './EpisodeDetail';
import { EpisodeExtended } from '../models';

type EpisodeDialogProps = {
  open: boolean;
  episode: EpisodeExtended;
  onClose: (event: any) => void;
  onResume: (event: any) => void;
  onPlayFromBeginning: (event: any) => void;
  onTogglePlayed: (event: any) => void;
};

function Transition(props: EpisodeDialogProps) {
  return <Slide direction="up" {...props} />;
}

class EpisodeDialog extends React.Component<EpisodeDialogProps, any> {
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
          <EpisodeDetail
            episode={this.props.episode}
            onResume={this.props.onResume}
            onPlayFromBeginning={this.props.onPlayFromBeginning}
            onTogglePlayed={this.props.onTogglePlayed}
          />
        </div>
      </Dialog>
    );
  }
}

export default EpisodeDialog;
