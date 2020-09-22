/**
 * Drawer, side menu
 */

import React from 'react';
import clsx from 'clsx';

// Material UI
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

// Material UI icons
import InfoIcon from '@material-ui/icons/Info';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import LocalBarIcon from '@material-ui/icons/LocalBar';

// Components
import SidebarButton from '../../../components/SidebarButton';

// Custom styles
import useStyles from './style';

// Sidebar
const Sidebar = ({ open, drawerWidth, handleDrawerClose }) => {
  const classes = useStyles({ drawerWidth: drawerWidth });

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
      open={open}
    >
      {/* Menu close button */}
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>

      <Divider />

      {/* Button links */}
      <List>
        <SidebarButton icon={DashboardIcon} primary='Dashboard' to='/' />
        <SidebarButton icon={DeveloperModeIcon} primary='Developer' to='/dev' />
        <SidebarButton icon={SettingsIcon} primary='Settings' to='/settings' />
        <SidebarButton icon={LocalBarIcon} primary='Recipes' to='/recipes' />
        <Divider />
        <SidebarButton icon={HistoryIcon} primary='History' to='/history' />
        <Divider />
        <SidebarButton icon={InfoIcon} primary='About' to='/about' />
      </List>
    </Drawer>
  );
};

export default Sidebar;
