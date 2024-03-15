import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Post.css';
import apiClient from '../../services/api-client';
//import { getCommentsByPostId } from '../../services/comment-service'; 
//import PostComment from '../PostComment';
import {PostData} from '../../services/posts-service'
export interface PostProps {
    post: PostData;
    onRemoveCbk: () => void;
}
const Post: React.FC<PostProps> = ({ post }) => {
    const history = useHistory();
    const [commentCount, setCommentCount] = useState<number>(0);


    const handleShowComments = async () => {
        if (!post._id) {
            console.error('Post ID is undefined');
            return;
          }
        
          try {
           // const comments = await getCommentsByPostId(post._id); 
           // console.log('Comments:', comments);
            history.push(`/comments/${post._id}`, {post});
          } catch (error) {
            console.error('Failed to fetch comments:', error);
          }
    };
    const handleAddComment = () => {
        // Navigate to the comment submission page, passing the post ID as a parameter
        //history.push(`/add-comment/${post._id}`);
    };
    useEffect(() => {
        const fetchCommentCount = async () => {
            try {
                const response = await apiClient.get(`/comments/count/${post._id}`);
                setCommentCount(response.data.count);
            } catch (error) {
                console.error('Error fetching comment count:', error);
            }
        };
        fetchCommentCount();
    }, [post._id]);

    return (
        <div className="post-container">
            <h1 className="post-title">{post.title}</h1>
            <p className="post-message">{post.message}</p>
            <img src={post.postImg} alt="Post" className="post-image" />
            <p className="comment-count">Comments: {commentCount}</p>
            <div className="comments-container">
           
        </div>
            <div className="button-container">
            <input type="text" className="comment-input" placeholder="Write here your comment.." />
                <button type="button" className="btn btn-primary" onClick={handleAddComment}>Add Comment</button>
                <button type="button" className="btn btn-primary" onClick={handleShowComments}>Show All Comments</button>
            </div>
        </div>
    );
}
//<PostComment post={post} />

export default Post;



// import { useHistory } from 'react-router-dom';
// import './Post.css'; // Import the CSS file

// export interface PostData {
//     title: string;
//     message: string;
//     _id?: string;
//     postImg: string;

// }

// export interface PostProps {
//     post: PostData;
//     onRemoveCbk: () => void;
// }

// const Post: React.FC<PostProps> = ({ post }) => {
//     const history = useHistory();

//     const handleClick = () => {
//         console.log("Clicked");
//         onRemoveCbk();
//     };
//     const handleShowComments = () => {
//         // Navigate to the PostComments page with the postId parameter
//         history.push(`/comments/${post._id}`);
//     };

//     return (
//         <div className="post-container">
//             <h1 className="post-title">{post.title}</h1>
//             <p className="post-message">{post.message}</p>
//             <img src={post.postImg} alt="Post" className="post-image" />
            
//             <div className="button-container">
//             <button type="button" className="btn btn-primary" onClick={handleClick}>Add Comment</button>
//             <button type="button" className="btn btn-primary" onClick={handleShowComments}>Show All Comments</button>
//             </div>
//         </div>
//     );
// }

// export default Post;
// function onRemoveCbk() {
//     throw new Error('Function not implemented.');
// }

