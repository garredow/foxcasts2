import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import AppsIcon from '@material-ui/icons/Apps';
import TimeIcon from '@material-ui/icons/AccessTime';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import ListSubheader from '@material-ui/core/ListSubheader';

interface ListItem {
  path: string;
  title: string;
  icon: any;
}

const listItems: ListItem[] = [
  { path: '/', title: 'Subscriptions', icon: <AppsIcon /> },
  { path: '/search', title: 'Search', icon: <SearchIcon /> },
];

interface PlaylistListItem extends ListItem {
  id: string;
}

const playlists: PlaylistListItem[] = [
  { path: '/playlist/recent', id: 'recent', title: 'Most Recent', icon: <TimeIcon /> },
  { path: '/playlist/inProgress', id: 'inProgress', title: 'In Progress', icon: <AppsIcon /> },
];

type NavListItemProps = {
  item: ListItem;
  onClick: (ev: React.MouseEvent) => void;
};

const NavListItem = ({ item, onClick }: NavListItemProps) => (
  <Link to={{ pathname: item.path }}>
    <ListItem button onClick={onClick}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText>{item.title}</ListItemText>
    </ListItem>
  </Link>
);

type SideNavProps = {
  open: boolean;
  onClose: (ev: any) => void;
};

class SideNav extends React.Component<SideNavProps, any> {
  render() {
    return (
      <Drawer open={this.props.open} onClose={this.props.onClose}>
        <List component="nav">
          {listItems.map(item => (
            <NavListItem item={item} onClick={this.props.onClose} key={item.title} />
          ))}
        </List>
        <List component="nav" subheader={<ListSubheader component="div">Filters</ListSubheader>}>
          {playlists.map(item => (
            <NavListItem item={item} onClick={this.props.onClose} key={item.title} />
          ))}
        </List>
        <Divider />
        <NavListItem
          item={{ path: '/settings', title: 'Settings', icon: <SettingsIcon /> }}
          onClick={this.props.onClose}
        />
      </Drawer>
    );
  }
}

export default SideNav;
