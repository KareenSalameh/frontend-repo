import { useHistory } from 'react-router-dom';
import './Post.css'; // Import the CSS file

export interface PostData {
    title: string;
    message: string;
    _id?: string;
    postImg: string;

}

export interface PostProps {
    post: PostData;
    onRemoveCbk: () => void;
}

const Post: React.FC<PostProps> = ({ post }) => {
    const history = useHistory();

    const handleClick = () => {
        console.log("Clicked");
        onRemoveCbk();
    };
    const handleShowComments = () => {
        // Navigate to the PostComments page with the postId parameter
        history.push(`/comments/${post._id}`);
    };

    return (
        <div className="post-container">
            <h1 className="post-title">{post.title}</h1>
            <p className="post-message">{post.message}</p>
            <img src={post.postImg} alt="Post" className="post-image" />
            
            <div className="button-container">
            <button type="button" className="btn btn-primary" onClick={handleClick}>Add Comment</button>
            <button type="button" className="btn btn-primary" onClick={handleShowComments}>Show All Comments</button>
            </div>
        </div>
    );
}

export default Post;
function onRemoveCbk() {
    throw new Error('Function not implemented.');
}

