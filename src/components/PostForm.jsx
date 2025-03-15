import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../redux/postsSlice';
import { TextField, Button, Typography, Grid, CircularProgress, FormHelperText, FormControl } from '@mui/material';

const PostForm = ({ postToEdit, onFormSubmit }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setText(postToEdit.text);
      setImage(null); 
      setImagePreview(null); 
    } else {
      setTitle('');
      setText('');
      setImage(null);
      setImagePreview(null);
    }
  }, [postToEdit]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!title || !text) {
      setError('Title and Text are required');
      return;
    }

    if (!postToEdit && !image) {
      setError('* Image is required when creating a new post');
      return;
    }

    setError(''); 

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    if (image) formData.append('image', image);

    setLoading(true);

    if (postToEdit) {
      dispatch(updatePost({ id: postToEdit.id, postData: formData })).then(() => {
        setTitle('');
        setText('');
        setImage(null);
        setImagePreview(null);
        setLoading(false);
        if (onFormSubmit) onFormSubmit();
      }).catch(() => setLoading(false)); 
    } else {
      dispatch(createPost(formData)).then(() => {
        setTitle('');
        setText('');
        setImage(null);
        setImagePreview(null);
        setLoading(false);
        if (onFormSubmit) onFormSubmit();
      }).catch(() => setLoading(false)); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>{postToEdit ? 'Edit Post' : 'Create Post'}</Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            error={!!error && !title} 
            helperText={error && !title ? 'Title is required' : ''}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            error={!!error && !text} 
            helperText={error && !text ? 'Text is required' : ''}
          />
        </Grid>

        {postToEdit && postToEdit.image && !imagePreview && (
          <Grid item xs={12}>
            <img
              src={postToEdit.image}
              alt="Current Post"
              style={{ width: '150px', marginBottom: '10px' }}
            />
          </Grid>
        )}

        {imagePreview && (
          <Grid item xs={12}>
            <img
              src={imagePreview}
              alt="New Post Preview"
              style={{ width: '150px', marginBottom: '10px' }}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <input type="file" onChange={handleImageChange} style={{ display: 'none' }} id="image-upload" />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
        </Grid>

        {error && !image && !postToEdit && (
          <Grid item xs={12}>
            <FormHelperText error>{error}</FormHelperText>
          </Grid>
        )}

<Grid item xs={12} container justifyContent="center">
  <Button
    variant="outlined"
    color="primary"
    type="submit"
    disabled={loading}
    sx={{
      '&:hover': {
        borderColor: 'white', 
        backgroundColor: 'primary.main', 
        color:'white'
      },
    }}
  >
    {loading ? <CircularProgress size={24} /> : (postToEdit ? 'Update Post' : 'Create Post')}
  </Button>
</Grid>

      </Grid>
    </form>
  );
};

export default PostForm;
