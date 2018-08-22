import React, { Component } from 'react';
import './App.css';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import SideNav from 'components/SideNav';
import MenuIcon from '@material-ui/icons/Menu';
import Routes from '../router';
import { BrowserRouter } from 'react-router-dom';
import AppContext from '../components/AppContext';

class App extends Component {
  state = {
    navOpen: false,
    appTitle: 'FoxCasts',
  };

  setAppTitle = title => {
    this.setState({ appTitle: title });
  };

  toggleNav = open => () => {
    this.setState({ navOpen: open });
  };

  render() {
    return (
      <BrowserRouter>
        <AppContext.Provider value={{ setAppTitle: this.setAppTitle }}>
          <SideNav open={this.state.navOpen} onClose={this.toggleNav(false)} />
          <AppBar position="sticky" color="default" className="app-bar">
            <Toolbar>
              <IconButton className="menu-icon">
                <MenuIcon onClick={this.toggleNav(true)} />
              </IconButton>
              <Typography variant="title">{this.state.appTitle}</Typography>
            </Toolbar>
          </AppBar>
          <Routes />
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
