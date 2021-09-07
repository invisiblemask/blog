import React, { useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import './register.css'
import axios from 'axios'

export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError(false)        
        try {
            const res = await axios.post('/auth/register', {
                username,
                email,
                password
            })
            res.data && window.location.replace('/login')
        } catch (error) {
            setError(true)        
        }
    }
    return (
        <div>
            <Topbar />
            <div className="register">
                <div className="register-cover">
                    <h2>Welcome to BLOG</h2>
                    <form className="register-form" onSubmit={handleSubmit}>
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
                        <button type="submit">Continue</button>
                        {error && <span style={{color: 'red'}}>Something went wrong</span>}
                    </form>
                </div>
            </div>
        </div>
    )
}
