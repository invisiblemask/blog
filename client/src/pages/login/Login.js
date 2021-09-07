import React, { useContext, useRef } from 'react'
import Topbar from '../../components/topbar/Topbar'
import { Context } from '../../context/Context'
import './login.css'
import axios from 'axios'

export default function Login() {
    const userRef = useRef()
    const passwordRef = useRef()
    const { dispatch, isFetching } = useContext(Context)

    const handleSubmit = async(e) => {
        e.preventDefault()
        dispatch({type: 'LOGIN_START'})
        try {
            const res = await axios.post('/auth/login', {
                email: userRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch({type: 'LOGIN_SUCCESS', payload: res.data})

        } catch (error) {
            dispatch({type: 'LOGIN_FAILURE'})
        }
    }
    return (
        <div>
            <Topbar />
            <div className="login">
                <div className="login-cover">
                    <h2>Welcome to BLOG</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input 
                            type="email" 
                            ref={userRef}
                        />
                        <label>Password</label>
                        <input 
                            type="password" 
                            ref={passwordRef}
                        />
                        <button type="submit" disabled={isFetching}>Continue</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
