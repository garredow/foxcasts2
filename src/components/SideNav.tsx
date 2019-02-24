import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/FilterList';
import ListSubheader from '@material-ui/core/ListSubheader';

interface ListItem {
  path: string;
  title: string;
  icon: any;
}

interface PlaylistListItem extends ListItem {
  id: string;
}

type NavListItemProps = {
  item: ListItem;
  onClick: (ev: React.MouseEvent) => void;
};

function NavListItem({ item, onClick }: NavListItemProps) {
  return (
    <Link to={{ pathname: item.path }}>
      <ListItem button onClick={onClick}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText>{item.title}</ListItemText>
      </ListItem>
    </Link>
  );
}

type SideNavProps = {
  open: boolean;
  onClose: (ev: any) => void;
};

function SideNav({ open, onClose }: SideNavProps) {
  const listItems: ListItem[] = [
    { path: '/', title: 'Subscriptions', icon: <AppsIcon /> },
    { path: '/search', title: 'Search', icon: <SearchIcon /> },
  ];

  const playlists: PlaylistListItem[] = [
    { path: '/playlist/recent', id: 'recent', title: 'Most Recent', icon: <ListIcon /> },
    { path: '/playlist/inProgress', id: 'inProgress', title: 'In Progress', icon: <ListIcon /> },
  ];

  return (
    <Drawer open={open} onClose={onClose}>
      <List component="nav">
        {listItems.map(item => (
          <NavListItem item={item} onClick={onClose} key={item.title} />
        ))}
      </List>
      <List component="nav" subheader={<ListSubheader component="div">Filters</ListSubheader>}>
        {playlists.map(item => (
          <NavListItem item={item} onClick={onClose} key={item.title} />
        ))}
      </List>
      <Divider />
      <NavListItem
        item={{ path: '/settings', title: 'Settings', icon: <SettingsIcon /> }}
        onClick={onClose}
      />
    </Drawer>
  );
}

export default SideNav;
