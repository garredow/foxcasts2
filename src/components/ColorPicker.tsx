import React, { SyntheticEvent } from 'react';
import {
  withStyles,
  Theme,
  WithStyles,
  Typography,
  InputLabel,
  NativeSelect,
  FormControl,
  Color,
  List,
  ListItem,
} from '@material-ui/core';
import { colors as muiColors } from '@material-ui/core';

const colorFamilyOptions = [
  { name: 'Amber', value: 'amber' },
  { name: 'Blue', value: 'blue' },
  { name: 'Blue Grey', value: 'blueGrey' },
  { name: 'Brown', value: 'brown' },
  { name: 'Cyan', value: 'cyan' },
  { name: 'Deep Orange', value: 'deepOrange' },
  { name: 'Deep Purple', value: 'deepPurple' },
  { name: 'Green', value: 'green' },
  { name: 'Grey', value: 'grey' },
  { name: 'Indigo', value: 'indigo' },
  { name: 'Light Blue', value: 'lightBlue' },
  { name: 'Light Green', value: 'lightGreen' },
  { name: 'Lime', value: 'lime' },
  { name: 'Orange', value: 'orange' },
  { name: 'Pink', value: 'pink' },
  { name: 'Purple', value: 'purple' },
  { name: 'Red', value: 'red' },
  { name: 'Teal', value: 'teal' },
  { name: 'Yellow', value: 'yellow' },
];

const styles: any = (theme: Theme) => ({
  container: {
    padding: '15px',
    marginBottom: '60px',
  },
  row: {
    width: '100%',
    marginBottom: '20px',
  },
  groupHeader: {
    marginBottom: '15px',
  },
  colorRow: {
    marginBottom: '5px',
  },
  colorRowLabel: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: '5px 7px',
    marginLeft: '10px',
    display: 'inline-block',
    borderRadius: '3px',
  },
});

type OwnProps = {
  onSelectColor: (colorHex: string) => void;
};

type ColorPickerProps = WithStyles & OwnProps;

type ColorPickerState = {
  colorFamily: string;
  colorVariants?: Color;
};

class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
  state: ColorPickerState = {
    colorFamily: 'pink',
  };

  componentDidMount = () => {
    this.getVariants('pink');
  };

  handleColorFamilyChange = (ev: SyntheticEvent<HTMLSelectElement>) => {
    this.getVariants(ev.currentTarget.value);
  };

  getVariants = (colorFamily: string) => {
    const colorVariants = (muiColors as any)[colorFamily] as Color;
    this.setState({ colorFamily, colorVariants });
  };

  handleSelectColor = (variant: string) => () => {
    const colorHex = (muiColors as any)[this.state.colorFamily][variant];
    this.props.onSelectColor(colorHex);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.row}>
          <InputLabel htmlFor="theme">Color Family</InputLabel>
          <NativeSelect value={this.state.colorFamily} onChange={this.handleColorFamilyChange}>
            {colorFamilyOptions.map(color => (
              <option value={color.value} key={color.value}>
                {color.name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
        <Typography variant="h6" className={classes.groupHeader}>
          Variants
        </Typography>
        <List disablePadding>
          {this.state.colorVariants &&
            Object.keys(this.state.colorVariants).map(key => {
              const colorHex = (this.state.colorVariants as any)[key];
              return (
                <ListItem
                  button
                  disableGutters
                  key={key}
                  style={{ backgroundColor: colorHex }}
                  className={classes.colorRow}
                  onClick={this.handleSelectColor(key)}
                >
                  <div className={classes.colorRowLabel}>{key}</div>
                </ListItem>
              );
            })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPicker);
