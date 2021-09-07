import React, { useContext } from 'react'
import { FaBook, FaCog, FaHome, FaTags } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './sidebar.css'

export default function Sidebar({open}) {
    const { user, dispatch } = useContext(Context)

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
    }
    return (
        <div 
            className={open ? 'open' : 'sidebar'}
            open={open}
        >
            <ul className="sidebar-links">
                <li>
                    <Link className="link" to="/"><FaHome className="sidebar-icon" />Home</Link>
                </li>
                <li><FaTags className="sidebar-icon" /> Tags</li>
                <li><FaBook className="sidebar-icon" /> Reading Lists</li>
                <li>
                    <Link className="link" to="/settings">
                        <FaCog className="sidebar-icon" /> Settings
                    </Link>
                </li>
                <div className="sidebar-btn">
                    {user && <button onClick={handleLogout}>Sign out</button>}
                </div>
            </ul>
        </div>
    )
}
