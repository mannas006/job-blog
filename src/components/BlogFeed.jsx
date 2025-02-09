import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { supabase } from '../supabase';

    function BlogFeed() {
      const [posts, setPosts] = useState([]);

      useEffect(() => {
        const fetchPosts = async () => {
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
          }
        };

        fetchPosts();
      }, []);

      return (
        <div className="blog-feed">
          <div className="blog-grid">
            {posts.map((post) => (
              <Link to={`/post/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="blog-post" style={{ overflow: 'hidden' }}>
                  <div className="blog-post-content">
                    <h2 className="blog-post-title">{post.title}</h2>
                    <p className="blog-post-excerpt" dangerouslySetInnerHTML={{ __html: post.description.substring(0, 75) + '...' }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
    }

    export default BlogFeed;
