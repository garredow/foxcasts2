import React, { SyntheticEvent } from 'react';
import { SettingsWithMethods, Settings } from '../models/Settings';
import SettingsContext from '../components/SettingsContext';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { withStyles, WithStyles } from '@material-ui/core';

const styles: any = {
  container: {
    padding: '15px',
  },
  row: {
    width: '100%',
    marginBottom: '20px',
  },
};

type SettingsPageProps = WithStyles;

type SettingsPageState = Settings;

class SettingsPage extends React.Component<SettingsPageProps, SettingsPageState> {
  static contextType = SettingsContext;
  context!: SettingsWithMethods;
  state: SettingsPageState = {
    theme: 'dark',
    episodeRowLayout: 'default',
    navLayout: 'bottom',
  };

  componentDidMount = () => {
    this.setState({
      theme: this.context.theme,
      episodeRowLayout: this.context.episodeRowLayout,
      navLayout: this.context.navLayout,
    });
  };

  handleSettingChange = (settingName: string) => (ev: SyntheticEvent<HTMLSelectElement>) => {
    const setting = { [settingName]: ev.currentTarget.value as any };
    this.context.updateSettings(setting);
    this.setState(setting as any);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.row}>
          <InputLabel htmlFor="theme">Theme</InputLabel>
          <NativeSelect value={this.state.theme} onChange={this.handleSettingChange('theme')}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="black">Black</option>
          </NativeSelect>
        </FormControl>
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
    );
  }
}

export default withStyles(styles)(SettingsPage);
