import React from 'react'
import { Link } from 'react-router-dom'
import './post.css'

export default function Post({post}) {
    const PF = 'http://localhost:5000/images/'
    return (
        <div className="post">
            { post.photo && (
                <img 
                    src={PF + post.photo}
                    alt="" 
                    className="post-img"
                />
            )}
            <div className="post-info">
                <div className="post-cats">
                    {post.categories.map((category) => (
                        <span className="post-cat" key={category._id} value={category}>{category.name}</span>
                    ))}
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <span className="post-title">
                        {post.title}
                    </span>
                </Link>

                <hr />
                <span className="post-date">{new Date(post.createdAt).toDateString()}</span>
            </div>
                <p className="post-desc">
                    {post.description}
                </p>
        </div>
    )
}
