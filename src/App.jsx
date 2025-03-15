import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

const App = () => {
  const [postToEdit, setPostToEdit] = useState(null);

  const handleEdit = (post) => {
    setPostToEdit(post);
  };

  const handleFormSubmit = () => {
    setPostToEdit(null); 
  };

  return (
    <Provider store={store}>
      <div>
        <h1>Post Management</h1>
        <PostForm postToEdit={postToEdit} onFormSubmit={handleFormSubmit} />
        <PostList handleEdit={handleEdit} />
      </div>
    </Provider>
  );
};

export default App;
