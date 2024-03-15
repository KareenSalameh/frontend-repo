import React, { useEffect, useState } from 'react';
import { PostData } from '../services/posts-service';
import { Comment, fetchComment } from '../services/comment-service';

interface PostCommentProps {
    location: {
        state: {
            post: PostData;
        };
    };
}

const PostComment: React.FC<PostCommentProps> = ({ location }) => {
    const { post } = location.state;
    const [comments, setComments] = useState<Comment[]>([]); // Initializing comments as an empty array

    useEffect(() => {
        
        const fetch = async () => {
            try {
                const commentsData = await fetchComment(post._id); 
                console.log('Comments data:', commentsData); // Log the comments data
                setComments(commentsData); 
            } catch (error) {
                console.error('Failed to fetch comments1:', error); 
            }
        };

        fetch(); 

    }, [post._id]); 

    // Rendering the comments
    return (
        <div>
            <h2>Comments for Post {post._id}</h2>
            {comments.map((comment, index) => ( // Mapping over comments array
                <div key={index}>
                    <p>Title: {comment.title}</p>
                    <p>Content: {comment.content}</p>
                    <p>Owner: {comment.owner.name}</p>
                </div>
            ))}
        </div>
    );
};


export default PostComment;


// import React from 'react';
// import { PostData } from './Posting/Post'

// interface PostCommentProps {
//     post: PostData;
// }
// const PostComment: React.FC<PostCommentProps> = ({ post }) => {


//     return (
//         <><div>
//             <h2>Comments for Post {post._id} </h2>
            
//         </div>
//         <div>
        
//         </div></>
//     );
    
// }
// export default PostComment;

// import  { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getCommentsByPostId } from '../services/comment-service'; // Import your comment service

// interface RouteParams {
//   postId: string; // Define the type of postId
// }

// interface Comment {
//   _id: string;
//   content: string;
//   // Add other properties of the comment object here
// }
// function PostComments() {
//     const { postId } = useParams<RouteParams>(); // Use the defined type for useParams
//     const [comments, setComments] = useState<Comment[]>([]); // Specify the type of comments
  
//     console.log('PostComments component rendered with postId:', postId); // Add this log
  
//     useEffect(() => {
//       async function fetchComments() {
//         try {
//           const fetchedComments = await getCommentsByPostId(postId);
//           console.log('Fetched Comments:', fetchedComments);
//           setComments(fetchedComments);
//         } catch (error) {
//           console.error('Error fetching comments:', error);
//         }
//       }
//       fetchComments();
//     }, [postId]);
  
//     return (
//       <div>
//         <h2>Comments for Post {postId}</h2>
//         <ul>
//           {comments.map(comment => (
//             <li key={comment._id}>
//               <li key= {comment.content}>
//                   </li>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
  

// function PostComments() {
//   const { postId } = useParams<RouteParams>(); // Use the defined type for useParams
//   const [comments, setComments] = useState<Comment[]>([]); // Specify the type of comments

//   useEffect(() => {
//     // Fetch comments for the specific postId
//     async function fetchComments() {
//       try {
//         const fetchedComments = await getCommentsByPostId(postId);
//         console.log('Fetched Comments:', fetchedComments);
//         setComments(fetchedComments);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     }
//     fetchComments();
//   }, [postId]);

//   return (
//     <div>
//       <h2>Comments for Post {postId}</h2>
//       <ul>
//         {comments.map(comment => (
//           <li key={comment._id}>
//             <li key= {comment.content}>
//                 </li>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

//export default PostComments;



// import React, { useState, useEffect } from 'react';
// import { getCommentsByPostId } from '../services/comment-service';

// interface Comment {
//         content: string;
//         postId: string;
// }

// const PostComment: React.FC<Comment> = ({ postId }) => {
//     const [comments, setComments] = useState<Comment[]>([]);

//     useEffect(() => {
//         const fetchComments = async () => {
//             try {
//                 const commentsData = await getCommentsByPostId(postId);
//                 setComments(commentsData);
//             } catch (error) {
//                 console.error('Error fetching comments:', error);
//             }
//         };

//         fetchComments();
//     }, [postId]);

//     return (
//         <div>
//             <h3>Comments</h3>
//             <ul>
//                 {comments.map((comment, index) => (
//                     <li key={index}>{comment.content}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default PostComment;
