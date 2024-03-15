import  { useEffect, useState } from 'react';
// import './MyPosts.css'; // Import the CSS file
import { PostData , getConnectedUserReviews} from "../../services/posts-service";
import './MyPosts.css'; // Import the CSS file
export interface PostProps {
    post: PostData;
}

function MyPosts() {
    const [posts, setPosts] = useState<PostData[]>([]);
    //const userId = JSON.parse(localStorage.getItem('user') || '{}').id; // Assuming user ID is stored in 'id' property

    useEffect(() => {
        // Fetch posts by user ID when the component mounts
        const fetchPostsByUserId = async () => {
            try {
                const posts = await getConnectedUserReviews();
               // const userPosts = await getPostById(userId);
                setPosts(posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPostsByUserId();
    }, []); 

    return (
        <div className="post-cont">
          {posts.map((post) => (
            <div key={post.id} className="post2">
              <h3>{post.title}</h3>
              <p>{post.message}</p>
            </div>
          ))}
        </div>
      );
      
}

export default MyPosts;

// import React, { useEffect, useState } from 'react';
// // import './MyPosts.css'; // Import the CSS file
// import { PostData, getPostById } from "../../services/posts-service";

// export interface PostProps {
//     post: PostData;
// }

// function MyPosts() {
//     const [posts, setPosts] = useState<PostData[]>([]);
//     const userId = JSON.parse(localStorage.getItem('user') || '{}').id; // Assuming user ID is stored in 'id' property

//     useEffect(() => {
//         const fetchPostsByUserId = async () => {
//             try {
//                 const posts = await getPostById(userId);
//                 setPosts(posts);
//             } catch (error) {
//                 console.error('Error fetching posts:', error);
//             }
//         };

//         fetchPostsByUserId();
//     }, [userId]); 

//     return (
//         <div className="post-container">
//             {posts.map((post) => (
//                 <div key={post.id} className="post">
//                     <h3>{post.title}</h3>
//                     <p>{post.message}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default MyPosts;
