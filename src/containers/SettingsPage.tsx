import React, { SyntheticEvent } from 'react';
import { SettingsWithMethods, EpisodeRowLayout } from '../models/Settings';
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

type SettingsPageState = {
  theme: 'dark' | 'light';
  episodeRowLayout: EpisodeRowLayout;
};

class SettingsPage extends React.Component<SettingsPageProps, SettingsPageState> {
  static contextType = SettingsContext;
  context!: SettingsWithMethods;
  state: SettingsPageState = {
    theme: 'dark',
    episodeRowLayout: 'default',
  };

  componentDidMount = () => {
    this.setState({
      theme: this.context.theme,
      episodeRowLayout: this.context.episodeRowLayout,
    });
  };

  setTheme = (theme: 'light' | 'dark') => () => {
    this.context.updateSettings({ theme });
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
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.row}>
          <InputLabel htmlFor="theme">Episode Row Layout</InputLabel>
          <NativeSelect
            value={this.state.episodeRowLayout}
            onChange={this.handleSettingChange('episodeRowLayout')}
          >
            <option value="default">Default</option>
            <option value="compact">Compact</option>
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(SettingsPage);
