import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Post.css';
import apiClient from '../../services/api-client';
import {PostData} from '../../services/posts-service'
import { createComment, getCommentsByPostId} from '../../services/comment-service';
export interface PostProps {
    post: PostData;
    onRemoveCbk: () => void;
}
const Post: React.FC<PostProps> = ({ post }) => {
    const history = useHistory();
    const [commentCount, setCommentCount] = useState<number>(0);
    const [commentContent, setCommentContent] = useState('');


    const handleShowComments = async () => {
        if (!post._id) {
            console.error('Post ID is undefined');
            return;
          }
          try {
            const postId = post._id;
            const comments = await getCommentsByPostId(postId);
            console.log('Comments:', comments);
            history.push(`/comments/${postId}`);
            // Do something with the fetched comments
          } catch (error) {
            console.error('Failed to fetch comments:', error);
          }
    };
    const handleAddComment = async () => {
        try {
            setCommentCount(commentCount + 1);

            const newComment = {
                content: "commentContent",
                postId: post._id || '', 
                owner: {
                    name: 'Anonymous',
                    imgUrl: 'https://via.placeholder.com/150', 
                },
                createdAt: 
                new Date(),
            };

            await createComment(newComment);
            //setCommentContent('');

        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };
    const handleCommentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentContent(event.target.value);
    };
    

    useEffect(() => {
        const fetchCommentCount = async () => {
            try {
                // Check if the comment count is stored in localStorage
                const storedCommentCount = localStorage.getItem(`commentCount_${post._id}`);
                if (storedCommentCount) {
                    setCommentCount(parseInt(storedCommentCount));
                } else {
                    const response = await apiClient.get(`/comments/count/${post._id}`);
                    const count = response.data.count;
                    setCommentCount(count);
                    
                    // Store the fetched comment count in localStorage
                    localStorage.setItem(`commentCount_${post._id}`, count.toString());
                }
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
            <input type="text" className="comment-input" placeholder="Write here your comment.." value={commentContent} 
    onChange={handleCommentInputChange}  />
                <button type="button" className="btn btn-primary" onClick={handleAddComment}>Add Comment</button>
                <button type="button" className="btn btn-primary" onClick={handleShowComments}>Show All Comments</button>
            </div>
        </div>
    );
}

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

