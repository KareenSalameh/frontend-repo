import apiClient, { CanceledError } from "./api-client"
import { PostData } from "../components/Post"


export { CanceledError }
const getAllPosts = () => {
    const abortController = new AbortController()
    const req = apiClient.get<PostData[]>('userpost', {signal: abortController.signal})
    return { req, abort: () => abortController.abort() }

}
// export const getAllPosts = () => {
   
//     return new Promise<PostData[]>((resolve, reject) => {
//       apiClient
//         .get(`/userpost/`)
//         .then((response) => {
//           resolve(response.data as Pos[]);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
// }

export default { getAllPosts }