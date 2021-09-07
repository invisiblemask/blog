import axios from 'axios'
import React, { useContext, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import { Context } from '../../context/Context'
import './settings.css'

export default function Settings() {
    const { user, dispatch } = useContext(Context)
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const PF = 'http://localhost:5000/images/'

    const handleSubmit = async(e) => {
        e.preventDefault()
        dispatch({ type: 'UPDATE_START' })
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        }
        if(file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append('name', filename)
            data.append('file', file)
            updatedUser.picture = filename
            try {
                await axios.post('/upload', data)
            } catch (error) {
                
            }
        }
        try {
            const res = await axios.put(`/users/${user._id}`, updatedUser)        
            setSuccess(true)
            dispatch({ type: 'UPDATE_SUCCESS', payload: res.data })
        } catch (error) {
            dispatch({ type: 'UPDATE_FAILURE' })
        }
    }
    return (
        <div>
            <Topbar />
            <div className="setting">
                <div className="setting-cover">
                    <div className="setting-form-cover">
                        <form onSubmit={handleSubmit}>
                            <div className="setting-header">
                                <h2>User Profile</h2>
                            </div>
                            <div  className="setting-form">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label>Profile image</label>
                                <div className="setting-pp">
                                    {
                                        user.picture ? (
                                            <img 
                                                src={file ? URL.createObjectURL(file) : PF + user.picture} 
                                                alt="" 
                                            />
                                        ) : (
                                            <img src="/images/Profile.png" alt="" />
                                        )
                                    }
                                    <input 
                                        type="file" 
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </div>
                            </div>
                            <div className="setting-submit">
                                <button className="setting-btn" type="submit">Save information</button>
                            </div>
                        </form>
                        {success && <span style={{color: 'green'}}>Profile has been updated</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}
