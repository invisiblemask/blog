import React from 'react'
import Post from '../Post/Post'
import './main.css'

export default function Main({posts}) {
    return (
        <div className="main">
            <h2 className="main-title-name">Posts</h2>
            {posts.map((post) => (
                <Post post={post} key={post._id} value={post}/>
            ))}
        </div>
    )
}
