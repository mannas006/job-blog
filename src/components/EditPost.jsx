import React, { useState, useEffect } from 'react';
    import { useNavigate, useParams } from 'react-router-dom';
    import { Editor } from '@tinymce/tinymce-react';
    import { supabase } from '../supabase';

    function EditPost() {
      const { id } = useParams();
      const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
      const [tags, setTags] = useState('');
      const [category, setCategory] = useState('');
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
              setTitle(data.title);
              setContent(data.description);
              setTags(data.tags ? data.tags.join(',') : '');
              setCategory(data.category);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchPost();
      }, [id]);

      const handleTitleChange = (e) => {
        setTitle(e.target.value);
      };

      const handleContentChange = (content, editor) => {
        setContent(content);
      };

      const handleTagsChange = (e) => {
        setTags(e.target.value);
      };

      const handleCategoryChange = (e) => {
        setCategory(e.target.value);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedPost = {
          title: title,
          description: content,
          category: category,
          tags: tags.split(',').map(tag => tag.trim()),
        };

        try {
          const { data, error } = await supabase
            .from('job_posts')
            .update(updatedPost)
            .eq('id', id);

          if (error) {
            console.error('Error updating data:', error);
          } else {
            console.log('Data updated successfully:', data);
            navigate(`/post/${id}`);
          }
        } catch (error) {
          console.error('Error updating data:', error);
        }
      };

      return (
        <div className="post-editor">
          <h2>Edit Post</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input type="text" value={title} onChange={handleTitleChange} />
            </label>
            <label>
              Category:
              <input type="text" value={category} onChange={handleCategoryChange} />
            </label>
            <label>
              Tags:
              <input type="text" value={tags} onChange={handleTagsChange} />
            </label>
            <label>
              Content:
              <Editor
                apiKey="z9i4exr56m5jcsf0ivw49dq6srv6oh5sv0o9k5xj86yk4j6n"
                value={content}
                onEditorChange={handleContentChange}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help'
                }}
              />
            </label>
            <button type="submit">Update Post</button>
          </form>
        </div>
      );
    }

    export default EditPost;
