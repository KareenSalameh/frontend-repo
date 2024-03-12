import React from 'react';
import { useHistory } from 'react-router-dom';

const MyPosts = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div>
      <h1>Hello, MyPosts!</h1>
      <button onClick={handleClick}>Go to Home</button>
    </div>
  );
};

export default MyPosts;
