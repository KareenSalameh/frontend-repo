import { useEffect, useState } from 'react';
import Post, { PostData } from './Post';
import postService, { CanceledError } from '../services/posts-service';
import './PostsList.css';


function PostsList() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [error, setError] = useState<string | null>(null); // Adjusted error state type
    useEffect(() => {
        const { req, abort } = postService.getAllPosts();
        req.then((res) => {
            setPosts(res.data);
        }).catch((err) => {
            console.log(err);
            if (err instanceof CanceledError) return;
            setError(err.message);
        });
        return () => {
            abort();
        };
    }, []);

    const handleRemove = (key: number) => {
        console.log('remove', key);
        const newPosts = posts.filter((post, index) => index !== key);
        setPosts(newPosts);
    };

    return (
        <div>

            {/* Posts List */}
            <div className="posts-container">
                {posts.map((post, index) => (
                    <Post key={index} post={post} onRemoveCbk={() => handleRemove(index)} />
                ))}
                {error && <p className="text-danger">{error}</p>}
            </div>
        </div>
    );
}
export default PostsList;
