import React from 'react';
import { Typography, Button } from '@material-ui/core';

import './EpisodeDetail.css';

class EpisodeDetail extends React.Component {
  render() {
    const episode = this.props.episode;

    if (!episode) return null;

    return (
      <React.Fragment>
        <div className="header-container">
          <Typography variant="title">{episode.title}</Typography>
          <Typography variant="subheading">{episode.author}</Typography>
        </div>
        <div className="actions-container">
          <Button variant="outlined" onClick={this.props.onStream}>
            Stream
          </Button>
        </div>
        <Typography variant="body1">{episode.subTitle}</Typography>
      </React.Fragment>
    );
  }
}

export default EpisodeDetail;
