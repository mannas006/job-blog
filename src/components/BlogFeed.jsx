import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { Skeleton, Box } from '@mui/material';

function BlogFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('job_posts')
          .select('id, title, description')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-feed">
      <div className="blog-grid">
        {loading ? (
          // Skeleton loading animation
          Array.from({ length: 6 }).map((_, index) => (
            <Box key={index} className="blog-post" sx={{ overflow: 'hidden', p: 2 }}>
              <Skeleton variant="text" height={50} />
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="text" height={30} />
            </Box>
          ))
        ) : (
          // Actual blog posts
          posts.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="blog-post" style={{ overflow: 'hidden' }}>
                <div className="blog-post-content">
                  <h2 className="blog-post-title">{post.title}</h2>
                  <p className="blog-post-excerpt" dangerouslySetInnerHTML={{ __html: post.description.substring(0, 75) + '...' }} />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default BlogFeed;
