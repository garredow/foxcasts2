import React, { Component } from 'react';
import './App.css';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import SideNav from 'components/SideNav';
import MenuIcon from '@material-ui/icons/Menu';
import Routes from '../router';
import { BrowserRouter } from 'react-router-dom';
import AppContext from '../components/AppContext';
import Player from './Player';

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
    console.log('updating active episode');
    this.setState({
      activeEpisode: episode,
    });
  };

  clearActiveEpisode = () => {
    console.log('removing active episode');
    this.setState({ activeEpisode: null });
  };

  toggleNav = open => () => {
    this.setState({ navOpen: open });
  };

  render() {
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
          <div className="route-container">
            <Routes />
          </div>
          <Player episode={this.state.activeEpisode} onStopPlayback={this.clearActiveEpisode} />
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
