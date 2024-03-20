import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Post.css';
import apiClient from '../../services/api-client';
import { PostData } from '../../services/posts-service';
import { createComment, getCommentsByPostId } from '../../services/comment-service';

interface PostProps {
    post: PostData;
    onRemoveCbk: () => void;
}

const Post: React.FC<PostProps> = ({ post }) => {
    const history = useHistory();
    const [commentCount, setCommentCount] = useState<number>(0);
    const commentContent = useRef<HTMLTextAreaElement>(null); 

    const handleShowComments = async () => {
        if (!post._id) {
            console.error('Post ID is undefined');
            return;
        }
        try {
            const postId = post._id;
            const comments = await getCommentsByPostId(postId);
            console.log('Comments:', comments);
            history.push(`/userpost/${postId}`);
            // Do something with the fetched comments
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    };

    const handleAddComment = async () => {
        if (commentContent.current?.value.trim() !== "") {
            try {
                setCommentCount(prevCount => prevCount + 1);
                commentContent.current!.value = "";

                await createComment({
                    content: commentContent.current!.value.trim(),
                    postId: post._id!,
                    owner: {
                        name: "Anonymous",
                        imgUrl: "https://via.placeholder.com/150",
                    },
                    createdAt: new Date(),
                });
                
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        const fetchCommentCount = async () => {
            try {
                const storedCommentCount = localStorage.getItem(`commentCount_${post._id}`);
                if (storedCommentCount) {
                    setCommentCount(parseInt(storedCommentCount));
                } else {
                    const response = await apiClient.get(`/comments/count/${post._id}`);
                    const count = response.data.count;
                    setCommentCount(count);
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
            <div className="comments-container"></div>
            <div className="button-container">
                {/* Use textarea for comment input */}
                <textarea className="comment-input" ref={commentContent} placeholder="Write here your comment.." />
                <button type="button" className="btn btn-primary" onClick={handleAddComment}>Add Comment</button>
                <button type="button" className="btn btn-primary" onClick={handleShowComments}>Show All Comments</button>
            </div>
        </div>
    );
};

export default Post;

