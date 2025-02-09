import React from 'react';
    import { Link } from 'react-router-dom';
    import {
      Box,
      Typography,
      List,
      ListItem,
      TextField,
      Button,
    } from '@mui/material';

    function Sidebar() {
      return (
        <Box className="sidebar" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mt: 4, p: 3, borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" component="h3" gutterBottom>
            Recent Posts
          </Typography>
          <List>
            <ListItem button component={Link} to="#">
              Recent Post 1
            </ListItem>
            <ListItem button component={Link} to="#">
              Recent Post 2
            </ListItem>
            <ListItem button component={Link} to="#">
              Recent Post 3
            </ListItem>
          </List>

          <Typography variant="h6" component="h3" mt={3} gutterBottom>
            Popular Categories
          </Typography>
          <List>
            <ListItem button component={Link} to="#">
              Category 1
            </ListItem>
            <ListItem button component={Link} to="#">
              Category 2
            </ListItem>
            <ListItem button component={Link} to="#">
              Category 3
            </ListItem>
          </List>

          <Typography variant="h6" component="h3" mt={3} gutterBottom>
            Newsletter Signup
          </Typography>
          <TextField
            label="Your Email"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary">
            Subscribe
          </Button>
        </Box>
      );
    }

    export default Sidebar;
