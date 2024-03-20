import apiClient from './api-client';
//import axios from 'axios';

export interface Comment {
  id?: string;
  content: string;
  owner: {
    name: string;
    imgUrl: string;
  };
  createdAt: Date; 
  postId: string;
}

export const createComment = (
  comment: Pick<Comment, "content" | "postId" | "createdAt" | "owner">
) => {
  return new Promise<void>((resolve, reject) => {
    console.log("Creating comment...");
    console.log(comment);
    apiClient
      .post(`/comments/`, comment)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
export const getCommentsByPostId = async (postId: string) => {
  try {
    const response = await apiClient.get(`/userpost/${postId}`);
    console.log(response.data);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to fetch comments by post ID');
  }

  // return new Promise<Comment>((resolve, reject) => {
  //   apiClient
  //     .get(`/comments/${postId}`)
  //     .then((response) => {
  //       const review = response.data as Comment;
  //       resolve(review);
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
};
//export const getCommentsForPost = async (postId: string): Promise<Comment[]> => {
  //   try {
  //     const response = await apiClient.get(`/comments/${postId}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching comments:', error);
  //     throw error;
  //   }
  // };
// Function to fetch comments by post ID
// export const getCommentsByPostId = async (postId: string | number | undefined) => {
//   try {
//     const response: AxiosResponse<Comment[]> = await axios.get(`/comments/${postId}`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Failed to fetch comments');
//   }
// };
export const fetchComment = async (postId: string) => {
  try {
    const response = await apiClient.get(`/comments/${postId}`); 
    console.log(response.data);
      return response.data; 
  } catch (error) {
      throw new Error('Failed to fetch  post data');
  }
};
export const getAllComments = () => {
  const abortController = new AbortController()
  const req = apiClient.get<Comment[]>('comments', {signal: abortController.signal})
  return { req, abort: () => abortController.abort() }

}

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



