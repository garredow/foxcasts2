import React, { SyntheticEvent, FormEvent, DetailedHTMLFactory } from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PodcastService from '../services/podcastService';
import ApiService from '../services/apiService';
import SearchResult from '../components/SearchResult';
import PodcastPreview from '../components/PodcastPreview';
import AppContext from '../components/AppContext';
import { AppContextProps, ITunesPodcast } from '../models';

const styles: any = {
  queryInput: {
    width: '100%',
  },
};

type SearchPageProps = WithStyles & AppContextProps;

type SearchPageState = {
  query: string;
  searchResults: any[];
  selectedPodcast?: ITunesPodcast;
  drawerOpen: boolean;
  searching: boolean;
};

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
  state: SearchPageState = {
    query: '',
    searchResults: [],
    drawerOpen: false,
    searching: false,
  };

  private apiService = new ApiService();
  private podcastService = new PodcastService();

  componentDidMount() {
    this.props.setAppTitle('Search');
  }

  handleQueryChange = (ev: any) => {
    this.setState({ query: ev.currentTarget.value });
  };

  search = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!this.state.query) {
      return;
    }

    this.setState({ searching: true });
    this.apiService
      .search(this.state.query)
      .then(results => this.setState({ searchResults: results }))
      .catch(err => console.error(err))
      .finally(() => this.setState({ searching: false }));
  };

  viewDetail = (podcast: ITunesPodcast) => () => {
    this.setState({ selectedPodcast: podcast });
    this.toggleDrawer(true)();
  };

  toggleDrawer = (open: boolean) => () => {
    this.setState({ drawerOpen: open });
  };

  subscribe = (podcastId: number) => () => {
    this.podcastService.subscribe(podcastId);
  };

  render() {
    const { classes } = this.props;

    const searchBarIcon = this.state.searching ? (
      <CircularProgress size={24} color="primary" />
    ) : (
      <IconButton type="submit" className="btn-search">
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
            endAdornment={<InputAdornment position="end">{searchBarIcon}</InputAdornment>}
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

const ComponentWithContext = (props: any) => (
  <AppContext.Consumer>
    {({ setAppTitle }: any) => <SearchPage {...props} setAppTitle={setAppTitle} />}
  </AppContext.Consumer>
);

export default withStyles(styles)(ComponentWithContext);
