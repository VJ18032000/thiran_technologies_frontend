import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('http://192.168.0.107:5000/posts');
  return response.data;
});

// Async thunk to create a post
export const createPost = createAsyncThunk('posts/createPost', async (postData) => {
  const response = await axios.post('http://192.168.0.107:5000/posts', postData);
  return response.data;
});

// Async thunk to update a post
export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, postData }) => {
  const response = await axios.put(`http://192.168.0.107:5000/posts/${id}`, postData);
  return response.data;
});

// Async thunk to delete a post
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await axios.delete(`http://192.168.0.107:5000/posts/${id}`);
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
