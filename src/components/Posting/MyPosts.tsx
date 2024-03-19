import React, { useEffect, useState } from 'react';
import { PostData, getAllPosts } from "../../services/posts-service";
import { editpost, deletePost } from "../../services/posts-service";
import './MyPosts.css'; 

function MyPosts() {
    const [posts, setPosts] = useState<PostData[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
              //  const usrid = localStorage.getItem('userId') as string
                const postsData = await getAllPosts();
                console.log(postsData);
                setPosts((await postsData.req).data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const handleEdit = async (postId: string) => {
        try {
            
            const postData: PostData = {
                title: "New Title",
                message: "New Message",
                postImg: "New Image URL",
                owner: localStorage.getItem('userId') as string,
                comments: [{ content: "New Comment", owner: { name: "New Comment Owner", imgUrl: "New Comment Owner Image URL" }, createdAt: new Date(), postId: "New Comment Post ID" }],
            };
    
            // Call the editPost service function
            await editpost(postId, postData);
    
            // Log success message
            console.log("Post edited successfully:", postId);
        } catch (error) {
            // Log error if edit fails
            console.error("Error editing post:", error);
        }
    };
    

    const handleDelete = async (postId: string) => {
        try {
            await deletePost(postId);
            // Remove the deleted post from state
            setPosts(posts.filter(post => post._id !== postId));
            console.log("Post deleted successfully:", postId);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div>
            <ul>
                {posts.map((post) => (
        <li key={post._id} className="my-post-container p2">
            <div>
                <h3 className="my-post-title">{post.title}</h3>
                <p className="my-post-text">{post.message}</p>
                {post.postImg && <img src={post.postImg} alt="postImg" className="my-post-image p2" />}
                <button onClick={() => handleEdit(post._id ?? '')} className="my-post-button my-edit-button p2">Edit</button>
                <button onClick={() => handleDelete(post._id ?? '')} className="my-post-button my-delete-button p2">Delete</button>
            </div>
        </li>
    ))}



            </ul>
        </div>
    );
}

export default MyPosts;

// import { useEffect, useState } from 'react';
// import  { PostData, getAllPosts }  from "../../services/posts-service";
// import './MyPosts.css'; 

// function MyPosts() {
//     const [posts, setPosts] = useState<PostData[]>([]);

//     useEffect(() => {
//         const fetchReviews = async () => {
//             try {
//                 //const usrid = localStorage.getItem('userId') as string
//                 const postsData = await getAllPosts();
//                 console.log(postsData);
//                 setPosts((await postsData.req).data);
//             } catch (error) {
//                 console.error("Error fetching comments:", error);
//             }
//         };

//         fetchReviews();
//     }, []);

//     return (
//         <div>
//             <h2>My Posts</h2>
//             <ul>
//                 {posts.map((post) => (
//                     <li key={post.id}>{post.title}<p>{post.message}</p>
//                     <img src={post.postImg} alt="postImg" width="200" height="200"></img>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default MyPosts;

// import  { useEffect, useState } from 'react';
// // import './MyPosts.css'; // Import the CSS file
// import { PostData , getPostById} from "../../services/posts-service";
// import './MyPosts.css'; // Import the CSS file
// export interface PostProps {
//     post: PostData;
// }

// function MyPosts() {
//     const [posts, setPosts] = useState<PostData[]>([]);
//     const fetchReviews = async () => {
//       try {
//         const posts2 = await getPostById(localStorage.getItem('userId') as string);
//         setPosts([posts2]);
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     };
  
//     useEffect(() => {
//       fetchReviews();
//     }, []);
  
//     return (
//       <div>
//         <h2>My Posts</h2>
//         <ul>
//           {posts.map((post) => (
//             <li key={post.id}>{post.title}<p>{post.message}</p></li>
//           ))}
//         </ul>
//       </div>
//     );

//     // return (
//     //   <><div>
//     //     <h2>My Posts</h2>
//     //   </div><div className="post-cont">
//     //       {posts.map((post) => (
//     //         <div key={post.id} className="post2">
//     //           <h3>{post.title}</h3>
//     //           <p>{post.message}</p>
//     //         </div>
//     //       ))}
//     //     </div></>
//     //   );
      
// }

// export default MyPosts;

