import React, { useContext, useState } from 'react'
import './create.css'
import { FaImage, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Context';

export default function Create() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const { user } = useContext(Context)

    const handleSubmit = async(e) => {
        e.preventDefault()
        const newPost = {
            username: user.username,
            title,
            description
        }
        if(file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append('name', filename)
            data.append('file', file)
            newPost.photo = filename
            try {
                await axios.post('/upload', data)
            } catch (error) {
                
            }
        }
        try {
            const res = await axios.post('/posts', newPost)        
            window.location.replace(`/post/${res.data._id}`)
        } catch (error) {
            
        }
    }
    return (
        <div className="create">
            <div className="create-wrapper">
                <Link to="/" className="link">
                    <button className="wrapper-icon"><FaTimes /> </button>
                </Link>
                <h2>Create Post</h2>
                <form className="create-form" onSubmit={handleSubmit}>
                    <div className="create-cover">
                        {file && (
                            <img 
                                src={URL.createObjectURL(file)} 
                                alt="" 
                                className="create-img"
                            />
                        )}
                        <input 
                            type="text" 
                            className="create-input" 
                            placeholder="New post title here..." 
                            autoFocus 
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="file-input"  className="create-input" ><FaImage  className="create-icon"  />Upload image</label>
                        <input 
                            type="file" 
                            id="file-input" 
                            className="create-input file" 
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <textarea 
                            type="text" 
                            className="create-input" 
                            placeholder="write your post here..." 
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button className="create-submit" type="submit">Publish</button>
                </form>
            </div>
        </div>
    )
}
