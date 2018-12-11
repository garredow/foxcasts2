import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/FilterList';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { EpisodeExtended } from '../models';
import PlayerButton from './PlayerButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TimeIcon from '@material-ui/icons/AccessTime';
import ProgressIcon from '@material-ui/icons/AvTimer';

const styles: any = (theme: Theme) => {
  return {
    navContainer: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      borderTop: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
      paddingBottom: 'var(--home-bar-spacing)',
    },
    filterDrawerPaper: {
      paddingBottom: 'calc(60px + var(--home-bar-spacing))',
    },
  };
};

type Filter = {
  id: string;
  title: string;
  icon: any;
};

const filters: Filter[] = [
  { id: 'filter-recent', title: 'Most Recent', icon: <TimeIcon /> },
  { id: 'filter-inProgress', title: 'In Progress', icon: <ProgressIcon /> },
];

type OwnProps = {
  episode?: EpisodeExtended;
  onOpenFullPlayer: () => void;
  onCloseFullPlayer: () => void;
};
type BottomNavProps = OwnProps & WithStyles & RouteComponentProps;

type BottomNavState = {
  selectedTab: string;
  filterDrawerOpen: boolean;
};

class BottomNav extends React.Component<BottomNavProps, BottomNavState> {
  state: BottomNavState = {
    selectedTab: 'subscriptions',
    filterDrawerOpen: false,
  };

  handleTabChange = (ev: any, selectedTab: any) => {
    if (selectedTab === 'nowPlaying') {
      this.props.onOpenFullPlayer();
      return;
    }

    if (selectedTab === 'filters') {
      this.toggleFilterDrawer();
      return;
    }

    this.setState({ selectedTab });
    this.navigateTo(selectedTab);
  };

  handleFilterChange = (filterId: string) => () => {
    this.setState({ selectedTab: 'filters' });
    this.toggleFilterDrawer();
    this.navigateTo(filterId);
  };

  navigateTo = (page: string) => {
    this.props.onCloseFullPlayer();

    switch (page) {
      case 'subscriptions':
        this.props.history.push('/');
        break;
      case 'discover':
        this.props.history.push('/search');
        break;
      case 'settings':
        this.props.history.push('/settings');
        break;
      case 'filter-recent':
        this.props.history.push('/playlist/recent');
        break;
      case 'filter-inProgress':
        this.props.history.push('/playlist/inProgress');
        break;
    }
  };

  toggleFilterDrawer = () => {
    this.setState({ filterDrawerOpen: !this.state.filterDrawerOpen });
  };

  render() {
    const { classes, episode } = this.props;

    return (
      <React.Fragment>
        <div className={classes.navContainer}>
          <BottomNavigation value={this.state.selectedTab} onChange={this.handleTabChange}>
            <BottomNavigationAction label="Subs" icon={<AppsIcon />} value="subscriptions" />
            <BottomNavigationAction label="Filters" icon={<ListIcon />} value="filters" />
            <BottomNavigationAction
              showLabel={false}
              style={{ paddingTop: '2px' }}
              icon={
                episode ? (
                  <PlayerButton progress={75} episodeCover={episode.cover[100]} />
                ) : (
                  <PlayIcon style={{ fontSize: '50px' }} />
                )
              }
              value="nowPlaying"
            />
            <BottomNavigationAction label="Discover" icon={<SearchIcon />} value="discover" />
            <BottomNavigationAction label="Settings" icon={<SettingsIcon />} value="settings" />
          </BottomNavigation>
        </div>
        <Drawer
          anchor="bottom"
          open={this.state.filterDrawerOpen}
          classes={{ paper: classes.filterDrawerPaper }}
          onClose={this.toggleFilterDrawer}
        >
          <List>
            {filters.map(filter => (
              <ListItem button onClick={this.handleFilterChange(filter.id)} key={filter.id}>
                <ListItemIcon>{filter.icon}</ListItemIcon>
                <ListItemText>{filter.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default compose<any, any>(
  withStyles(styles),
  withRouter
)(BottomNav);
