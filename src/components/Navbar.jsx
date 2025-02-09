import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import { supabase } from '../supabase';
    import MenuIcon from '@mui/icons-material/Menu';
    import CloseIcon from '@mui/icons-material/Close';
    import { IconButton, Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

    function Navbar({ toggleDarkMode, darkMode }) {
      const [drawerOpen, setDrawerOpen] = useState(false);

      const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setDrawerOpen(open);
      };

      return (
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-logo">
              <Link to="/">JobPost</Link>
            </div>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }} className="navbar-links">
              <Link to="/">Home</Link>
              <Link to="/editor">Post a Job</Link>
              <button onClick={() => supabase.auth.signOut()}>Logout</button>
              <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </Box>

            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    <ListItem key="Home" disablePadding>
                      <ListItemButton component={Link} to="/">
                        <ListItemText primary="Home" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem key="Post a Job" disablePadding>
                      <ListItemButton component={Link} to="/editor">
                        <ListItemText primary="Post a Job" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem key="Logout" disablePadding>
                      <ListItemButton onClick={() => supabase.auth.signOut()}>
                        <ListItemText primary="Logout" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem key="Dark Mode" disablePadding>
                      <ListItemButton onClick={toggleDarkMode}>
                        <ListItemText primary={darkMode ? 'Light Mode' : 'Dark Mode'} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem key="Close" disablePadding>
                      <ListItemButton onClick={toggleDrawer(false)}>
                        <ListItemText primary="Close" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </Box>
          </div>
        </nav>
      );
    }

    export default Navbar;
