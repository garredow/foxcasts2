import React from 'react';
import {
  Input,
  InputAdornment,
  IconButton,
  List,
  Drawer,
  CircularProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PodcastService from '../services/podcastService';
import ApiService from '../services/apiService';
import SearchResult from '../components/SearchResult';
import PodcastPreview from 'components/PodcastPreview';
import AppContext from '../components/AppContext';

const apiService = new ApiService();
const podcastService = new PodcastService();

const styles = {
  queryInput: {
    width: '100%',
  },
};

class SearchPage extends React.Component {
  state = {
    query: '',
    searchResults: [],
    selectedPodcast: null,
    drawerOpen: false,
    searching: false,
  };

  componentDidMount() {
    this.props.setAppTitle('Search');
  }

  handleQueryChange = ev => {
    this.setState({ query: ev.target.value });
  };

  search = ev => {
    ev.preventDefault();

    if (!this.state.query) {
      return;
    }

    this.setState({ searching: true });
    apiService
      .search(this.state.query)
      .then(results => this.setState({ searchResults: results }))
      .catch(err => console.error(err))
      .finally(() => this.setState({ searching: false }));
  };

  viewDetail = podcast => () => {
    console.log(podcast);
    this.setState({ selectedPodcast: podcast });
    this.toggleDrawer(true)();
  };

  toggleDrawer = open => () => {
    this.setState({ drawerOpen: open });
  };

  subscribe = podcastId => () => {
    podcastService.subscribe(podcastId);
  };

  render() {
    const { classes } = this.props;

    const searchBarIcon = this.state.searching ? (
      <CircularProgress size={24} color="primary" />
    ) : (
      <IconButton type="submit">
        <SearchIcon />
      </IconButton>
    );

    return (
      <div className="page-container">
        <form onSubmit={this.search}>
          <Input
            placeholder="Query"
            className={classes.queryInput}
            onChange={this.handleQueryChange}
            value={this.state.query}
            endAdornment={<InputAdornment>{searchBarIcon}</InputAdornment>}
          />
        </form>
        <List>
          {this.state.searchResults.map(result => (
            <SearchResult
              podcast={result}
              key={result.collectionId}
              onClick={this.viewDetail(result)}
            />
          ))}
        </List>
        <Drawer anchor="bottom" open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
          {this.state.selectedPodcast && (
            <PodcastPreview
              podcast={this.state.selectedPodcast}
              onSubscribe={this.subscribe(this.state.selectedPodcast.collectionId)}
            />
          )}
        </Drawer>
      </div>
    );
  }
}

const ComponentWithContext = props => (
  <AppContext.Consumer>
    {({ setAppTitle }) => <SearchPage {...props} setAppTitle={setAppTitle} />}
  </AppContext.Consumer>
);

export default withStyles(styles)(ComponentWithContext);
