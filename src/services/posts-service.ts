import apiClient, { CanceledError } from "./api-client"
import { PostData } from "../components/Posting/Post"


export { CanceledError }
const getAllPosts = () => {
    const abortController = new AbortController()
    const req = apiClient.get<PostData[]>('userpost', {signal: abortController.signal})
    return { req, abort: () => abortController.abort() }

}
// export const getReviewById = (reviewId: string) => {
//     return new Promise<Review>((resolve, reject) => {
//       apiClient
//         .get(`/reviews/id/${reviewId}`)
//         .then((response) => {
//           const review = response.data as Review;
//           resolve(review);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   };


export default { getAllPosts }