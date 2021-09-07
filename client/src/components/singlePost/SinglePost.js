import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { Context } from '../../context/Context'
import Topbar from '../topbar/Topbar'
import './singlePost.css'

export default function SinglePost() {
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const [post, setPost] = useState({})
    const PF = 'http://localhost:5000/images/'
    const { user } = useContext(Context)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() => {
        const getPost = async() => {
            const res = await axios.get(`/posts/${path}`)
            setPost(res.data)
            setTitle(res.data.title)
            setDescription(res.data.description)
        }
        getPost()
    }, [path])

    const handleDelete = async() => {
        try {
            await axios.delete(`/post/${post._id}`, { data: { username: user.username }})
            window.location.replace('/')            
        } catch (error) {
            
        }
    }

    const handleUpdate = async() => {
        try {
            await axios.put(`/posts/${post._id}`, 
                { 
                    username: user.username,
                    title,
                    description
                }
            )
            setUpdateMode(false)            
        } catch (error) {
            
        }
    }

    return (
        <div>
            <Topbar />
            <div className="single-post">
                <div className="single-post-wrapper">
                    <div className="single-post-action">
                        {post.username === user?.username && (
                            <>
                                <FaTrash className="single-post-icon" onClick={handleDelete}/>
                                <FaEdit className="single-post-icon" onClick={() => setUpdateMode(true)}/>
                            </>
                        )}
                    </div>
                    <div className="single-card">
                        <div className="single-post-card">
                            {post.photo && (
                                <img 
                                    src={PF + post.photo}
                                    alt="" 
                                    className="single-post-img"
                                />
                            )} {
                                updateMode ? <input type="text" value={title} className="single-post-title-input" onChange={(e) => setTitle(e.target.value)} autoFocus/> : (
                                    <h1 className="single-post-title">
                                        {title}
                                    </h1>

                                )}
                                <div className="single-post-info">
                                    <span className="single-post-author">
                                        Author: 
                                            <Link to={`/?user=${post.username}`} className="link">
                                                <strong>{post.username}</strong>
                                            </Link>
                                    </span>
                                    <span className="single-post-date">{new Date(post.createdAt).toDateString()}</span>
                                </div>
                            {
                                updateMode ? <textarea className="single-post-desc-input" value={description} onChange={(e) => setDescription(e.target.value)}/> : (
                                    <p className="single-post-desc">
                                        {description}
                                    </p>
                                )
                            }
                            
                        </div>
                        <div className="single-button">
                            {
                                updateMode && <button onClick={handleUpdate}>Update</button>
                            }
                        </div>
                    </div>

                    </div>
            </div>
        </div>
    )
}
