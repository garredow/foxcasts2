import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'containers/App';
import registerServiceWorker from './registerServiceWorker';
// import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: { type: 'dark' },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
