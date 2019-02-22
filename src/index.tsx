import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';
import { Settings, SettingsWithMethods, ThemeName } from './models/Settings';
import SettingsContext from './components/SettingsContext';
import { SettingsService } from './services/settingsService';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

type AppWrapperState = {
  themeName: string;
  theme: Theme;
  settings: SettingsWithMethods;
};

class AppWrapper extends React.Component<any, AppWrapperState> {
  state: AppWrapperState;
  settingsService = new SettingsService();

  constructor(props: any) {
    super(props);

    this.state = {
      themeName: 'dark',
      theme: this.createTheme('dark', '#f06292', '#d500f9'),
      settings: {
        theme: 'dark',
        themePrimary: '#f06292',
        themeSecondary: '#d500f9',
        episodeRowLayout: 'compact',
        navLayout: 'bottom',
        updateSettings: this.updateSettings,
      },
    };
  }

  componentDidMount = () => {
    const settings = this.settingsService.getSettings();
    if (settings) {
      this.updateSettings(settings);
    }
  };

  updateSettings = (settings: Partial<Settings>) => {
    const newSettings: SettingsWithMethods = Object.assign({}, this.state.settings, settings);
    this.saveSettings(newSettings);

    const theme = this.createTheme(
      newSettings.theme,
      newSettings.themePrimary,
      newSettings.themeSecondary
    );

    this.setState({ settings: newSettings, theme });
  };

  saveSettings = (fullSettings: SettingsWithMethods) => {
    const settings: Settings = {
      theme: fullSettings.theme,
      themePrimary: fullSettings.themePrimary,
      themeSecondary: fullSettings.themeSecondary,
      episodeRowLayout: fullSettings.episodeRowLayout,
      navLayout: fullSettings.navLayout,
    };

    this.settingsService.setSettings(settings);
  };

  createTheme = (themeName: ThemeName, primaryColor: string, secondaryColor: string) => {
    let palette: PaletteOptions = {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
    };

    switch (themeName) {
      case 'light':
        palette.type = 'light';
        break;
      case 'dark':
        palette.type = 'dark';
        break;
      case 'black':
        palette.type = 'dark';
        palette.background = {
          default: '#000',
          paper: '#101010',
        };
        break;
      default:
        palette = {};
    }
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      palette,
      overrides: {
        MuiBottomNavigationAction: {
          root: {
            minWidth: '60px',
          },
        },
      },
    });

    return theme;
  };

  render() {
    return (
      <SettingsContext.Provider value={this.state.settings}>
        <MuiThemeProvider theme={this.state.theme}>
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </SettingsContext.Provider>
    );
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
