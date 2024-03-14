import React, { useState, useEffect } from 'react';
import { getCommentsByPostId } from '../services/comment-service';

interface Comment {
        content: string;
        postId: string;
}

const PostComment: React.FC<Comment> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsData = await getCommentsByPostId(postId);
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId]);

    return (
        <div>
            <h3>Comments</h3>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default PostComment;
