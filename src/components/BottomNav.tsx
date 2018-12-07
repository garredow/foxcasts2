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

const styles: any = (theme: Theme) => {
  return {
    root: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  };
};

type OwnProps = {
  episode?: EpisodeExtended;
  onOpenFullPlayer: () => void;
};
type BottomNavProps = OwnProps & WithStyles & RouteComponentProps;

type BottomNavState = {
  selectedTab: string;
};

class BottomNav extends React.Component<BottomNavProps, BottomNavState> {
  state: BottomNavState = {
    selectedTab: 'subscriptions',
  };

  handleChange = (ev: any, selectedTab: any) => {
    if (selectedTab === 'nowPlaying') {
      this.props.onOpenFullPlayer();
      return;
    }

    this.setState({ selectedTab });

    switch (selectedTab) {
      case 'subscriptions':
        this.props.history.push('/');
        break;
      case 'filters':
        this.props.history.push('/playlist/recent');
        break;
      case 'discover':
        this.props.history.push('/search');
        break;
      case 'settings':
        this.props.history.push('/settings');
        break;
    }
  };

  render() {
    const { classes, episode } = this.props;

    return (
      <BottomNavigation
        value={this.state.selectedTab}
        className={classes.root}
        onChange={this.handleChange}
      >
        <BottomNavigationAction label="Subs" icon={<AppsIcon />} value="subscriptions" />
        <BottomNavigationAction label="Filters" icon={<ListIcon />} value="filters" />
        <BottomNavigationAction
          label="Play"
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
    );
  }
}

export default compose<any, any>(
  withStyles(styles),
  withRouter
)(BottomNav);
