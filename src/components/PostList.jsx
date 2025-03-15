import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../redux/postsSlice';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PostList = ({ handleEdit }) => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  if (loading) return <CircularProgress />; 
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Posts</Typography>
      <List sx={{ backgroundColor: '#f4f6f8', borderRadius: 2 }}>
        {posts.map((post, index) => (
          <ListItem
            key={post.id}
            alignItems="flex-start"
            sx={{
              backgroundColor: index % 2 === 0 ? '#e3f2fd' : '#ffffff',
              marginBottom: 2,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#90caf9', 
              },
            }}
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                style={{ width: 100, height: 100, objectFit: 'cover', marginRight: 16 }}
              />
            )}
            <ListItemText
              primary={<Typography variant="h6">{post.title}</Typography>}
              secondary={
                <Typography variant="body2" color="textSecondary">
                  {post.text}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(post)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(post.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PostList;
