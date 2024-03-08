import './Post.css'; // Import the CSS file

export interface PostData {
    title: string;
    message: string;
    owner: string;
}

export interface PostProps {
    post: PostData;
}

function Post({ post }: PostProps) {
    const handleClick = () => {
        console.log("Remove button clicked");
    };

    return (
        <div className="post-container">
            <h1 className="post-title">{post.title}</h1>
            <p className="post-message">{post.message}</p>
            <button type="button" className="btn btn-primary" onClick={handleClick}>Add Comment</button>
        </div>
    );
}

export default Post;
