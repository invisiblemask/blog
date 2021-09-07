import React, { useContext } from 'react'
import { FaBell, FaComment } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import Burger from '../burger/Burger';
import './topbar.css'

export default function Topbar() {
    const {user} = useContext(Context)
    const PF = 'http://localhost:5000/images/'

    return (
        <div className="topbar">
            <Burger />
            <div className="topbar-left">
                <Link className="link" to="/">
                    <strong>Blog</strong>
                </Link>
            </div>
            <div className="topbar-center">
                <input type="text" className="topbar-input"  placeholder="Search..." />
            </div>
            <div className="topbar-right">
                {
                    user ? 
                    (
                        <>
                        <Link className="link" to="/create">
                            <button className="topbar-create">Create Post</button>
                        </Link>
                        <FaComment className="topbar-icon" />
                        <FaBell className="topbar-icon" />
                        <Link className="link" to="/settings" >
                            {
                                user.picture ? (
                                <img 
                                    src={PF + user.picture}
                                    alt="" 
                                    className="topbar-img"    
                                />
                                ) : (
                                    <img 
                                        src="/images/Profile.png" 
                                        alt="" 
                                        className="topbar-img"
                                    />
                                )
                            }
                        </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="link">
                                <button className="topbar-login">Log in</button>
                            </Link>
                            <Link className="link" to="/register">
                                <button className="topbar-create">Create account</button>
                            </Link>
                        </>
                    )
                }
            </div>
        </div>
    )
}
