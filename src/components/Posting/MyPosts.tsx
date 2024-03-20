import React, { useEffect, useState } from 'react';
import { PostData } from "../../services/posts-service";
import './MyPosts.css'; 

function MyPosts() {
    const [localStoragePosts, setLocalStoragePosts] = useState<PostData[]>([]);

    useEffect(() => {
        // Retrieve posts from local storage
        const storedPostsJSON = localStorage.getItem('posts');
        if (storedPostsJSON) {
            const storedPosts: PostData[] = JSON.parse(storedPostsJSON);
            setLocalStoragePosts(storedPosts);
        }
    }, []);

    const handleEdit = async (postId: string) => {
        try {
            // Find the post to edit
            const editedPosts = localStoragePosts.map(post => {
                if (post._id === postId) {
                    // Edit the post here
                    return { ...post, title: "Edited Title", message: "Edited Message" }; // Replace with your logic
                }
                return post;
            });
            localStorage.setItem('posts', JSON.stringify(editedPosts));
            // Update state
            setLocalStoragePosts(editedPosts);
            console.log("Post edited successfully:", postId);
        } catch (error) {
            console.error("Error editing post:", error);
        }
    };

    const handleDelete = async (postId: string) => {
        try {
            // Filter out the post to delete
            const updatedPosts = localStoragePosts.filter(post => post._id !== postId);
            // Update the local storage with the updated posts
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            // Update state
            setLocalStoragePosts(updatedPosts);
            console.log("Post deleted successfully:", postId);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div>
            {/* Posts from local storage */}
            {localStoragePosts.length > 0 && (
                <ul>
                    {localStoragePosts.map((post, index) => (
                        <li key={`local-${index}`} className="my-post-container p2">
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
            )}
        </div>
    );
}

export default MyPosts;




// import { useEffect, useState } from 'react';
// import { PostData, getConnectedUserPosts } from "../../services/posts-service";
// import { editpost, deletePost } from "../../services/posts-service";
// import './MyPosts.css'; 

// function MyPosts() {
//     const [serverPosts, setServerPosts] = useState<PostData[]>([]);
//     const [localStoragePosts, setLocalStoragePosts] = useState<PostData[]>([]);

//     useEffect(() => {
//         // Fetch posts from the server
//         const fetchPosts = async () => {
//             try {
//                 const postsData = await getConnectedUserPosts(localStorage.getItem("userId") ?? '');
//                 setServerPosts(postsData);
//             } catch (error) {
//                 console.error("Error fetching posts:", error);
//             }
//         };
//         fetchPosts();

//         // Retrieve posts from local storage
//         const storedPostsJSON = localStorage.getItem('posts');
//         if (storedPostsJSON) {
//             const storedPosts: PostData[] = JSON.parse(storedPostsJSON);
//             setLocalStoragePosts(storedPosts);
//         }
//     }, []);

//     const handleEdit = async (postId: string) => {
//         try {
//             const postData: PostData = {
//                 title: "New Title",
//                 message: "New Message",
//                 postImg: "New Image URL",
//                 owner: localStorage.getItem('userId') as string,
//                 comments: [{ content: "New Comment", owner: { name: "New Comment Owner", imgUrl: "New Comment Owner Image URL" }, createdAt: new Date(), postId: "New Comment Post ID" }],
//             };
    
//             // Call the editPost service function
//             await editpost(postId, postData);
    
//             // Log success message
//             console.log("Post edited successfully:", postId);
//         } catch (error) {
//             // Log error if edit fails
//             console.error("Error editing post:", error);
//         }
//     };

//     const handleDelete = async (postId: string) => {
//         try {
//             await deletePost(postId);
//             // Remove the deleted post from state
//             setServerPosts(serverPosts.filter(post => post._id !== postId));
//             console.log("Post deleted successfully:", postId);
//         } catch (error) {
//             console.error("Error deleting post:", error);
//         }
//     };

//     return (
//         <div>
//             {/* Posts from server */}
//             {/* {serverPosts.length === 0 ? (
//                 <p>No Posts Yet</p>
//             ) : ( */}
//                 <ul>
//                     {serverPosts.map((post) => (
//                         <li key={post._id} className="my-post-container p2">
//                             <div>
//                                 <h3 className="my-post-title">{post.title}</h3>
//                                 <p className="my-post-text">{post.message}</p>
//                                 {post.postImg && <img src={post.postImg} alt="postImg" className="my-post-image p2" />}
//                                 <button onClick={() => handleEdit(post._id ?? '')} className="my-post-button my-edit-button p2">Edit</button>
//                                 <button onClick={() => handleDelete(post._id ?? '')} className="my-post-button my-delete-button p2">Delete</button>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
            

//             {/* Posts from local storage */}
//             {localStoragePosts.length > 0 && (
//                 <ul>
//                     {localStoragePosts.map((post, index) => (
//                         <li key={`local-${index}`} className="my-post-container p2">
//                             <div>
//                                 <h3 className="my-post-title">{post.title}</h3>
//                                 <p className="my-post-text">{post.message}</p>
//                                 {post.postImg && <img src={post.postImg} alt="postImg" className="my-post-image p2" />}
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }

// export default MyPosts; 







// import { useEffect, useState } from 'react';
// import { PostData, getConnectedUserPosts } from "../../services/posts-service";
// import { editpost, deletePost } from "../../services/posts-service";
// import './MyPosts.css'; 

// function MyPosts() {
//     const [posts, setPosts] = useState<PostData[]>([]);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const postsData = await getConnectedUserPosts(localStorage.getItem("userId") ?? '');
//                 console.log(postsData);
//                 setPosts(postsData);
//             } catch (error) {
//                 console.error("Error fetching posts:", error);
//             }
//         };

//         fetchPosts();
//     }, []);

//        const handleEdit = async (postId: string) => {
//         try {
            
//             const postData: PostData = {
//                 title: "New Title",
//                 message: "New Message",
//                 postImg: "New Image URL",
//                 owner: localStorage.getItem('userId') as string,
//                 comments: [{ content: "New Comment", owner: { name: "New Comment Owner", imgUrl: "New Comment Owner Image URL" }, createdAt: new Date(), postId: "New Comment Post ID" }],
//             };
    
//             // Call the editPost service function
//             await editpost(postId, postData);
    
//             // Log success message
//             console.log("Post edited successfully:", postId);
//         } catch (error) {
//             // Log error if edit fails
//             console.error("Error editing post:", error);
//         }
//     };
    

//     const handleDelete = async (postId: string) => {
//         try {
//             await deletePost(postId);
//             // Remove the deleted post from state
//             setPosts(posts.filter(post => post._id !== postId));
//             console.log("Post deleted successfully:", postId);
//         } catch (error) {
//             console.error("Error deleting post:", error);
//         }
//     };

//     return (
//         <div>
//             {posts.length === 0 ? (
//                 <p>No Posts Yet</p>
//             ) : (
//                 <ul>
//                     {posts.map((post) => (
//                         <li key={post._id} className="my-post-container p2">
//                             <div>
//                                 <h3 className="my-post-title">{post.title}</h3>
//                                 <p className="my-post-text">{post.message}</p>
//                                 {post.postImg && <img src={post.postImg} alt="postImg" className="my-post-image p2" />}
//                                 <button onClick={() => handleEdit(post._id ?? '')} className="my-post-button my-edit-button p2">Edit</button>
//                                 <button onClick={() => handleDelete(post._id ?? '')} className="my-post-button my-delete-button p2">Delete</button>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }

// export default MyPosts;

// import { useEffect, useState } from 'react';
// import { PostData, getConnectedUserPosts } from "../../services/posts-service";
// import { editpost, deletePost } from "../../services/posts-service";
// import './MyPosts.css'; 

// function MyPosts() {
//     const [posts, setPosts] = useState<PostData[]>([]);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//               //  const usrid = localStorage.getItem('userId') as string
//                 const postsData = await getConnectedUserPosts(localStorage.getItem("userId")!);
//                 console.log(postsData);
//                 setPosts(postsData)
//                // setPosts((await postsData.req).data);
//             } catch (error) {
//                 console.error("Error fetching posts:", error);
//             }
//         };

//         fetchPosts();
//     }, []);

//     const handleEdit = async (postId: string) => {
//         try {
            
//             const postData: PostData = {
//                 title: "New Title",
//                 message: "New Message",
//                 postImg: "New Image URL",
//                 owner: localStorage.getItem('userId') as string,
//                 comments: [{ content: "New Comment", owner: { name: "New Comment Owner", imgUrl: "New Comment Owner Image URL" }, createdAt: new Date(), postId: "New Comment Post ID" }],
//             };
    
//             // Call the editPost service function
//             await editpost(postId, postData);
    
//             // Log success message
//             console.log("Post edited successfully:", postId);
//         } catch (error) {
//             // Log error if edit fails
//             console.error("Error editing post:", error);
//         }
//     };
    

//     const handleDelete = async (postId: string) => {
//         try {
//             await deletePost(postId);
//             // Remove the deleted post from state
//             setPosts(posts.filter(post => post._id !== postId));
//             console.log("Post deleted successfully:", postId);
//         } catch (error) {
//             console.error("Error deleting post:", error);
//         }
//     };

//     return (
//         <div>
//             <ul>
//                 {posts.map((post) => (
//                     <li key={post._id} className="my-post-container p2">
//                         <div>
//                             <h3 className="my-post-title">{post.title}</h3>
//                             <p className="my-post-text">{post.message}</p>
//                             {post.postImg && <img src={post.postImg} alt="postImg" className="my-post-image p2" />}
//                             <button onClick={() => handleEdit(post._id ?? '')} className="my-post-button my-edit-button p2">Edit</button>
//                             <button onClick={() => handleDelete(post._id ?? '')} className="my-post-button my-delete-button p2">Delete</button>
//                         </div>
//                     </li>
//                 ))}

//             </ul>
//         </div>
//     );
// }

// export default MyPosts;

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

