import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import AppsIcon from '@material-ui/icons/Apps';

const listItems = [
  { path: '/', title: 'Subscriptions', icon: <AppsIcon /> },
  { path: '/search', title: 'Search', icon: <AppsIcon /> },
];

const playlists = [
  // { path: '/playlist/recent', id: 'recent', title: 'Most Recent', icon: <AppsIcon /> },
  // { path: '/playlist/downloaded', id: 'downloaded', title: 'Downloaded', icon: <AppsIcon /> },
  // { path: '/playlist/inProgress', id: 'inProgress', title: 'In Progress', icon: <AppsIcon /> },
];

const NavListItem = ({ item, onClick }) => (
  <Link to={{ pathname: item.path }}>
    <ListItem button onClick={onClick}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText>{item.title}</ListItemText>
    </ListItem>
  </Link>
);

class SideNav extends React.Component {
  render() {
    return (
      <Drawer open={this.props.open} onClose={this.props.onClose}>
        <List component="nav">
          {listItems.map(item => (
            <NavListItem item={item} onClick={this.props.onClose} key={item.title} />
          ))}
        </List>
        <Divider />
        <List component="nav">
          {playlists.map(item => (
            <NavListItem item={item} onClick={this.props.onClose} key={item.title} />
          ))}
        </List>
      </Drawer>
    );
  }
}

export default SideNav;
