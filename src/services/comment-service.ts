import axios from 'axios';

// Function to fetch comments by post ID
export const getCommentsByPostId = async (postId: string | number) => {
  try {
    const response = await axios.get(`/comments?postId=${postId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch comments');
  }
};
