import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Editor } from '@tinymce/tinymce-react';
    import { supabase } from '../supabase';

    function PostEditor() {
      const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
      const [tags, setTags] = useState('');
      const [category, setCategory] = useState('');
      const navigate = useNavigate();

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

        const newPost = {
          title: title,
          description: content,
          category: category,
          tags: tags.split(',').map(tag => tag.trim()),
        };

        try {
          const { data, error } = await supabase
            .from('job_posts')
            .insert([newPost])
            .select();

          if (error) {
            console.error('Error inserting data:', error.message);
          } else {
            console.log('Data inserted successfully:', data);
            navigate('/');
          }
        } catch (error) {
          console.error('Error inserting data:', error.message);
        }
      };

      return (
        <div className="post-editor">
          <h2>Create New Post</h2>
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
                  menubar: true,
                  plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
                  toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  automatic_uploads: false,
                  file_picker_types: 'image',
                  images_upload_url: 'postAcceptor.php',
                  relative_urls: false,
                  remove_script_host: false,
                  convert_urls: true,
                  invalid_elements : 'script,img',
                  extended_valid_elements : 'a[href|name|target]',
                }}
              />
            </label>
            <button type="submit">Publish</button>
          </form>
        </div>
      );
    }

    export default PostEditor;
