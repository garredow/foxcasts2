import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SideNav from 'components/SideNav';
import MenuIcon from '@material-ui/icons/Menu';
import Routes from '../router';
import { BrowserRouter } from 'react-router-dom';
import AppContext from '../components/AppContext';
import Player from './Player';

const styles = {
  routeContainer: {
    paddingBottom: '30px',
    marginBottom: '30px',
  },
};

class App extends Component {
  state = {
    navOpen: false,
    appTitle: 'FoxCasts',
    activeEpisode: null,
  };

  setAppTitle = title => {
    this.setState({ appTitle: title });
  };

  setActiveEpisode = episode => {
    this.setState({
      activeEpisode: episode,
    });
  };

  clearActiveEpisode = () => {
    this.setState({ activeEpisode: null });
  };

  toggleNav = open => () => {
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
          <AppBar position="sticky" color="default" className="app-bar">
            <Toolbar>
              <IconButton className="menu-icon">
                <MenuIcon onClick={this.toggleNav(true)} />
              </IconButton>
              <Typography variant="title">{this.state.appTitle}</Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.routeContainer}>
            <Routes />
          </div>
          <Player episode={this.state.activeEpisode} onStopPlayback={this.clearActiveEpisode} />
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);
