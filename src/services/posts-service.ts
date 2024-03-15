import apiClient, { CanceledError } from "./api-client"
import { Comment } from "./comment-service";

export interface PostData {
    id : string
    title: string;
    message: string;
    _id?: string;
    owner: {
        name: string;
        imgUrl: string;
    };
    postImg: string;
    comment: [Comment];
}

export { CanceledError }
const getAllPosts = () => {
    const abortController = new AbortController()
    const req = apiClient.get<PostData[]>('userpost', {signal: abortController.signal})
    return { req, abort: () => abortController.abort() }

}
const fetchPost = async () => {
    try {
        // Make an HTTP GET request to fetch post data
        const response = await apiClient.get('/userpost/:id'); 
        return response.data; // Assuming the response contains the post data
    } catch (error) {
        throw new Error('Failed to fetch post data');
    }
};
export const getPostById = (postId: string) => {
    return new Promise<PostData>((resolve, reject) => {
      apiClient
        .get(`/userpost/${postId}`)
        .then((response) => {
          const review = response.data as PostData;
          resolve(review);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const getConnectedUserReviews = () => {
    return new Promise<PostData[]>((resolve, reject) => {
      apiClient
        .get(`/userpost`)
        .then((response) => {
          const reviews = response.data as PostData[];
          resolve(reviews);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
export default { getAllPosts, fetchPost }