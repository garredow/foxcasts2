import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Routes from '../router';
import { BrowserRouter } from 'react-router-dom';
import AppContext from '../components/AppContext';
import Player from './Player';
import SideNav from '../components/SideNav';
import { EpisodeExtended } from '../models';
import BottomNav from '../components/BottomNav';
import SettingsContext from '../components/SettingsContext';
import { SettingsWithMethods } from '../models/Settings';

const styles: any = {
  routeContainer: {
    paddingBottom: '30px',
    marginBottom: '30px',
    maxWidth: '980px',
    margin: '0 auto',
  },
};

type AppProps = {
  classes: any;
};

type AppState = {
  navOpen: boolean;
  appTitle: string;
  activeEpisode?: EpisodeExtended;
  fullPlayerOpen: boolean;
};

class App extends React.Component<AppProps, AppState> {
  static contextType = SettingsContext;
  context!: SettingsWithMethods;
  state: AppState = {
    navOpen: false,
    appTitle: 'FoxCasts',
    activeEpisode: undefined,
    fullPlayerOpen: false,
  };

  setAppTitle = (title: string) => {
    this.setState({ appTitle: title });
  };

  setActiveEpisode = (episode: EpisodeExtended) => {
    this.setState({
      activeEpisode: episode,
    });
  };

  clearActiveEpisode = () => {
    this.setState({ activeEpisode: undefined, fullPlayerOpen: false });
  };

  openFullPlayer = () => {
    this.setState({ fullPlayerOpen: true });
  };

  closeFullPlayer = () => {
    this.setState({ fullPlayerOpen: false });
  };

  toggleNav = (open: boolean) => () => {
    this.setState({ navOpen: open });
  };

  render() {
    const { classes } = this.props;

    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{ setAppTitle: this.setAppTitle, setActiveEpisode: this.setActiveEpisode }}
        >
          <SideNav open={this.state.navOpen} onClose={this.toggleNav(false)} />
          {this.context.navLayout === 'side' && (
            <AppBar position="sticky" color="default" className="app-bar">
              <Toolbar>
                <IconButton className="menu-icon">
                  <MenuIcon onClick={this.toggleNav(true)} />
                </IconButton>
                <Typography variant="h6">{this.state.appTitle}</Typography>
              </Toolbar>
            </AppBar>
          )}
          <div className={classes.routeContainer}>
            <Routes />
          </div>
          <Player
            episode={this.state.activeEpisode}
            fullPlayerOpen={this.state.fullPlayerOpen}
            onStopPlayback={this.clearActiveEpisode}
            onCloseFulllPlayer={this.closeFullPlayer}
          />
          {this.context.navLayout === 'bottom' && (
            <BottomNav
              episode={this.state.activeEpisode}
              onOpenFullPlayer={this.openFullPlayer}
              onCloseFullPlayer={this.closeFullPlayer}
            />
          )}
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
