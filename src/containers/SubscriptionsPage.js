import React from 'react';
import PodcastService from '../services/podcastService';
import { List, ListItem, ListItemText, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AppContext from '../components/AppContext';

const podcastService = new PodcastService();

const PodcastRow = ({ podcast }) => (
  <Link to={{ pathname: `/podcast/${podcast.id}` }}>
    <ListItem button>
      <Avatar src={podcast.cover['100']} />
      <ListItemText primary={podcast.title} secondary={podcast.author} />
    </ListItem>
  </Link>
);

class SubscriptionsPage extends React.Component {
  state = { podcasts: [] };

  componentDidMount() {
    this.props.setAppTitle('Subscriptions');

    podcastService
      .getSubscriptions()
      .then(podcasts => this.setState({ podcasts }))
      .catch(err => console.error('Failed to get podcasts', err));
  }
  render() {
    return (
      <div className="page-container">
        <List>
          {this.state.podcasts.map(podcast => (
            <PodcastRow podcast={podcast} key={podcast.id} />
          ))}
        </List>
      </div>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {({ setAppTitle }) => <SubscriptionsPage {...props} setAppTitle={setAppTitle} />}
  </AppContext.Consumer>
);
