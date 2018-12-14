import React, { SyntheticEvent } from 'react';
import { SettingsWithMethods, Settings } from '../models/Settings';
import SettingsContext from '../components/SettingsContext';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import {
  withStyles,
  WithStyles,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import ColorPicker from '../components/ColorPicker';
import CloseIcon from '@material-ui/icons/Close';

const styles: any = {
  container: {
    padding: '15px',
  },
  row: {
    width: '100%',
    marginBottom: '20px',
  },
  groupHeader: {
    marginBottom: '15px',
  },
};

type SettingsPageProps = WithStyles;

type OwnState = {
  colorPickerOpen: boolean;
  colorPickerField?: string;
};
type SettingsPageState = OwnState & Settings;

class SettingsPage extends React.Component<SettingsPageProps, SettingsPageState> {
  static contextType = SettingsContext;
  context!: SettingsWithMethods;
  state: SettingsPageState = {
    theme: 'dark',
    themePrimary: '#f06292',
    themeSecondary: '#d500f9',
    episodeRowLayout: 'default',
    navLayout: 'bottom',
    colorPickerOpen: false,
  };

  componentDidMount = () => {
    this.setState({
      theme: this.context.theme,
      themePrimary: this.context.themePrimary,
      themeSecondary: this.context.themeSecondary,
      episodeRowLayout: this.context.episodeRowLayout,
      navLayout: this.context.navLayout,
    });
  };

  handleSettingChange = (settingName: string) => (ev: SyntheticEvent<HTMLSelectElement>) => {
    const setting = { [settingName]: ev.currentTarget.value as any };
    this.context.updateSettings(setting);
    this.setState(setting as any);
  };

  openColorPicker = (colorPickerField: string) => () => {
    this.setState({ colorPickerField, colorPickerOpen: true });
  };

  closeColorPicker = () => {
    this.setState({ colorPickerField: undefined, colorPickerOpen: false });
  };

  handleColorPicked = (colorHex: string) => {
    const field = this.state.colorPickerField as string;
    this.context.updateSettings({ [field]: colorHex });
    this.setState({
      [field]: colorHex,
      colorPickerField: undefined,
      colorPickerOpen: false,
    } as any);
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.container}>
          <Typography variant="h6" className={classes.groupHeader}>
            Theme
          </Typography>
          <FormControl className={classes.row}>
            <InputLabel htmlFor="theme">Theme Base</InputLabel>
            <NativeSelect value={this.state.theme} onChange={this.handleSettingChange('theme')}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="black">Black</option>
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.row}>
            <Button
              style={{ backgroundColor: this.state.themePrimary }}
              onClick={this.openColorPicker('themePrimary')}
            >
              Primary Color
            </Button>
          </FormControl>
          <FormControl className={classes.row}>
            <Button
              style={{ backgroundColor: this.state.themeSecondary }}
              onClick={this.openColorPicker('themeSecondary')}
            >
              Secondary Color
            </Button>
          </FormControl>
          <Typography variant="h6" className={classes.groupHeader}>
            Layout
          </Typography>
          <FormControl className={classes.row}>
            <InputLabel htmlFor="episodeRowLayout">Episode Row Layout</InputLabel>
            <NativeSelect
              value={this.state.episodeRowLayout}
              onChange={this.handleSettingChange('episodeRowLayout')}
            >
              <option value="default">Default</option>
              <option value="compact">Compact</option>
            </NativeSelect>
          </FormControl>
          <FormControl className={classes.row}>
            <InputLabel htmlFor="navLayout">Navigation Layout</InputLabel>
            <NativeSelect
              value={this.state.navLayout}
              onChange={this.handleSettingChange('navLayout')}
            >
              <option value="bottom">Bottom</option>
              <option value="side">Side</option>
            </NativeSelect>
          </FormControl>
        </div>
        <Drawer
          anchor="bottom"
          open={this.state.colorPickerOpen}
          classes={{ paper: classes.colorPicker }}
        >
          <AppBar position="sticky" className="app-bar">
            <Toolbar>
              <IconButton onClick={this.closeColorPicker}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <ColorPicker onSelectColor={this.handleColorPicked} />
        </Drawer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SettingsPage);
