import React from 'react';
import { useEffect, useState } from 'react'
import Post, {PostData} from './Post'
//import axios, { CanceledError } from 'axios';
import postService, { CanceledError } from "../services/posts-service"
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
        const {req, abort} = postService.getAllPosts()
        req.then((res)=>{
            setPosts(res.data)
        }).catch((err) => {
            console.log(err)
            if(err instanceof CanceledError) return
            setError(err.message)
        })
        return () => {
            abort()
        }
    },[])
    const handleRemove = (key:number) => {
        console.log('remove',key)
        const newPosts = posts.filter((post, index) => index !== key)
        setPosts(newPosts)
    }
    
    return (
       
        <div className="posts-container">
            {posts.map((post, index) => 
            <Post key={index} post={post} onRemoveCbk={()=> handleRemove(index)}/>)} 
            {error && <p className='text-danger'>{error}</p>}
            
        </div>
    )
}
export default PostsList