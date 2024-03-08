import React from 'react';
import { useEffect, useState } from 'react'
import Post, {PostData} from './Post'
import axios from 'axios';
import './PostsList.css'

// interface PostData {
//     title: string;
//     message: string;
//     owner: string;
// } 

function PostsList() {
    const [posts, setPosts] = useState<PostData[]>([])
    const [error, setError] = useState();
    useEffect(() => {
        axios.get<PostData[]>('http://localhost:3000/userpost').then((response) => {
            console.log(response.data)
            setPosts(response.data)
        }).catch((err) => {
            console.log(err)
            setError(err.message)
        })
    },[])
    
    return (
       
        <div className="posts-container">
            {posts.map((post, index) => 
            <Post key={index} post={post} />)} 
            {error && <p className='text-danger'>{error}</p>}
            
        </div>
    )
}
export default PostsList