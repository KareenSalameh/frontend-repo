import React, { useState } from 'react';
import { createPost, PostDescription } from '../../services/posts-service';
import './AddPost.css'; // Import the CSS file
const AddPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [postImg, setPostImg] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }
    const newPost: PostDescription = {
      title : title,
      message,
      postImg,
      owner: userId,
      comments: [{ content: '', owner: { name: 'test', imgUrl: '' }, createdAt: new Date(), postId: userId }],
    }
    try {
      await createPost(newPost);
      window.location.href = '/';
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="add-post-container">
      <h2>Add New Post</h2>
      <form className="add-post-form" onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div>
          <label>Post Image:</label>
          <input type="file" value={postImg} onChange={(e) => setPostImg(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPost;
