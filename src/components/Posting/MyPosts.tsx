//import './MyPosts.css'; // Import the CSS file

export interface PostData {
    title: string;
    message: string;
    owner: string;
    _id?: string;
    comments: [];
    postImg: string;
}

export interface PostProps {
    post: PostData;
}

function MyPosts({ post }: PostProps) {

    return (
        <div className="post-container">
            <h1 className="post-title">{post.title}</h1>
            <p className="post-message">{post.message}</p>
            <img src={post.postImg} alt="Post" className="post-image" />
            <p className="post-id">{post._id}</p>
            
            <div className="button-container">
            <button type="button" className="btn btn-primary" >Add Comment</button>
            <button type="button" className="btn btn-primary" >Show All Comments</button>
            </div>
        </div>
    );
}

export default MyPosts
