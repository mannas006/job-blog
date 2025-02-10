import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { supabase } from '../supabase';

function Sidebar() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('job_posts')
          .select('id, title')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) {
          console.error('Error fetching recent posts:', error);
        } else {
          setRecentPosts(data);
        }
      } catch (error) {
        console.error('Error fetching recent posts:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('job_posts')
          .select('category')
          .distinct()
          .limit(5);

        if (error) {
          console.error('Error fetching categories:', error);
        } else {
          setCategories(data.map(item => item.category));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchRecentPosts();
    fetchCategories();
  }, []);

  return (
    <Box className="sidebar" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mt: 4, p: 3, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        Recent Posts
      </Typography>
      <List>
        {recentPosts.map((post) => (
          <ListItem key={post.id} disablePadding>
            <ListItemButton component={Link} to={`/post/${post.id}`}>
              <ListItemText primary={post.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" component="h3" mt={3} gutterBottom>
        Popular Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category} disablePadding>
            <ListItemButton component={Link} to={`/?category=${category}`}>
              <ListItemText primary={category} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;
