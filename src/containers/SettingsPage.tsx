import React, { SyntheticEvent } from 'react';
import { SettingsWithMethods } from '../models/Settings';
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
  },
};

type SettingsPageProps = WithStyles;

type SettingsPageState = {
  theme: 'dark' | 'light';
};

class SettingsPage extends React.Component<SettingsPageProps, SettingsPageState> {
  state = {
    theme: 'dark' as 'dark' | 'light',
  };

  componentDidMount = () => {
    this.setState({
      theme: this.getContext().theme,
    });
  };

  getContext() {
    return (this as any).context as SettingsWithMethods;
  }

  setTheme = (theme: 'light' | 'dark') => () => {
    this.getContext().updateSettings({ theme });
  };

  handleThemeChange = (ev: SyntheticEvent<HTMLSelectElement>) => {
    const setting = { theme: ev.currentTarget.value as 'dark' | 'light' };
    this.getContext().updateSettings(setting);
    this.setState(setting);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.row}>
          <InputLabel htmlFor="theme">Theme</InputLabel>
          <NativeSelect value={this.state.theme} onChange={this.handleThemeChange}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

SettingsPage.contextType = SettingsContext;

export default withStyles(styles)(SettingsPage);
