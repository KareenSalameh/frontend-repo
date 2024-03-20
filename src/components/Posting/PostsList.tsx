import { useEffect, useState } from 'react';
import Post from './Post';
import postService, { CanceledError } from '../../services/posts-service';
import './PostsList.css';
import { PostData } from '../../services/posts-service';

function PostsList() {
    const [serverPosts, setServerPosts] = useState<PostData[]>([]);
    const [localStoragePosts, setLocalStoragePosts] = useState<PostData[]>([]);
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        // Fetch posts from the server
        const { req, abort } = postService.getAllPosts();
        req.then((res) => {
            setServerPosts(res.data);
        }).catch((err) => {
            console.log(err);
            if (err instanceof CanceledError) return;
            setError(err.message);
        });

        // Retrieve posts from local storage
        const storedPostsJSON = localStorage.getItem('posts');
        if (storedPostsJSON) {
            const storedPosts: PostData[] = JSON.parse(storedPostsJSON);
            setLocalStoragePosts(storedPosts);
        }

        return () => {
            abort();
        };
    }, []);

    const handleRemove = (key: number) => {
        // Remove post from the state
        const newServerPosts = serverPosts.filter((post, index) => index !== key);
        setServerPosts(newServerPosts);
        // Update local storage with the new server posts
        localStorage.setItem('posts', JSON.stringify(newServerPosts));
    };

    return (
        <div>
            {/* Posts List */}
            <div className="posts-container">
                {serverPosts.map((post, index) => (
                    <Post key={index} post={post} onRemoveCbk={() => handleRemove(index)} />
                ))}
                {localStoragePosts.map((post, index) => (
                    <Post key={`local-${index}`} post={post} onRemoveCbk={function (): void {
                        throw new Error('Function not implemented.');
                    } } />
                ))}
                {error && <p className="text-danger">{error}</p>}
            </div>
        </div>
    );
}

export default PostsList;

// import { useEffect, useState } from 'react';
// import Post from './Post';
// import postService, { CanceledError } from '../../services/posts-service';
// import './PostsList.css';
// import {PostData} from '../../services/posts-service'


// function PostsList() {
//     const [posts, setPosts] = useState<PostData[]>([]);
//     const [error, setError] = useState<string | null>(null); 
  
//     useEffect(() => {
//     const { req, abort } = postService.getAllPosts();
//         req.then((res) => {
//             setPosts(res.data);
//         }).catch((err) => {
//             console.log(err);
//             if (err instanceof CanceledError) return;
//             setError(err.message);
//         });
//         return () => {
//             abort();
//         };
//     }, []);

//     const handleRemove = (key: number) => {
//         console.log('remove', key);
//         const newPosts = posts.filter((post, index) => index !== key);
//         setPosts(newPosts);
//     };
    

//     return (
//         <div>
//             {/* Posts List */}
//             <div className="posts-container">
//                 {posts.map((post, index) => (
//                     <Post key={index} post={post} onRemoveCbk={() => handleRemove(index)} />
//                 ))}
//                 {error && <p className="text-danger">{error}</p>}
//             </div>
//         </div>
//     );
// }
// export default PostsList;
