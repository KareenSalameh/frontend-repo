import apiClient from './api-client';
export interface Comment {
  id?: string;
  title: string; 
  content: string;
  owner: {
    name: string;
    imgUrl: string;
  };
  createdAt: Date; 
  postId: string;
}


// Function to fetch comments by post ID
// export const getCommentsByPostId = async (postId: string | number | undefined) => {
//   try {
//     const response: AxiosResponse<Comment[]> = await axios.get(`/comments/${postId}`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Failed to fetch comments');
//   }
// };
export const fetchComment = async (postId: string | number | undefined ) => {
  try {
      // Make an HTTP GET request to fetch post data
      const response = await apiClient.get(`/comments/${postId}`); 
      console.log(response.data);
      return response.data; 
  } catch (error) {
      throw new Error('Failed to fetch post data');
  }
};

// export const getCommentsByPostId = async (postId: string | number | undefined) => {
//   try {
//     const response: AxiosResponse<Comment[]> = await axios.get(`/comments/${postId}`);

//     // Check if the response content type is JSON
//     const contentType = response.headers['content-type'];
//     if (!contentType || !contentType.includes('application/json')) {
//       // If the response is not JSON, throw an error
//       throw new Error('Unexpected response format: HTML');
//     }

//     return response.data;
//   } catch (error) {
//       throw new Error('Failed to fetch comments');
    
//   }
// };



