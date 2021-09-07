import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import './burger.css'

export default function Burger() {
    const [open, setOpen] = useState(false)
    const { user, dispatch } = useContext(Context)

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <div>
            <div 
                className={ open ? "bg" : "burger" } 
                open={ open } 
                onClick={() => setOpen(!open)}
            >
                <div />
                <div />
                <div />
            </div>
            <div 
            className={open ? 'open' : 'sidebar'}
            open={open}
        >
            <ul className="burger_sidebar-links">
                <li>
                    <Link className="link" to="/">Home</Link>
                </li>
                <li>Tags</li>
                <li>Reading Lists</li>
                <li>
                    <Link className="link" to="/settings">Settings</Link>
                </li>
                <div className="burger_sidebar-btn">
                    {user && <button onClick={handleLogout}>Sign out</button>}
                </div>
            </ul>
        </div>
        </div>
    )
}
