import React, { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { supabase } from '../supabase';
    import {
      Container,
      Typography,
      Button,
      Chip,
      Box,
      Paper,
    } from '@mui/material';
    import EditIcon from '@mui/icons-material/Edit';

    function BlogPost() {
      const { id } = useParams();
      const [post, setPost] = useState(null);
      const navigate = useNavigate();

      useEffect(() => {
        const fetchPost = async () => {
          try {
            const { data, error } = await supabase
              .from('job_posts')
              .select('*')
              .eq('id', id)
              .single();

            if (error) {
              console.error('Error fetching data:', error);
            } else {
              setPost(data);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchPost();
      }, [id]);

      if (!post) {
        return <div>Post not found</div>;
      }

      const handleEdit = () => {
        navigate(`/edit/${id}`);
      };

      return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              {post.title}
            </Typography>
            <Box sx={{ mb: 2 }} dangerouslySetInnerHTML={{ __html: post.description }} />

            {post.company_name && (
              <Typography variant="subtitle1" gutterBottom>
                Company: {post.company_name}
              </Typography>
            )}
            {post.location && (
              <Typography variant="subtitle1" gutterBottom>
                Location: {post.location}
              </Typography>
            )}
            {post.salary && (
              <Typography variant="subtitle1" gutterBottom>
                Salary: {post.salary}
              </Typography>
            )}

            <Box sx={{ mt: 2 }}>
              {post.tags &&
                post.tags.map((tag, index) => (
                  <Chip key={index} label={tag} sx={{ mr: 1, mb: 1 }} />
                ))}
            </Box>

            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              sx={{ mt: 3 }}
            >
              Edit Post
            </Button>
          </Paper>
        </Container>
      );
    }

    export default BlogPost;
