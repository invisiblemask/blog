import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './category.css'

export default function Category() {
    const [cats, setCats] = useState([])

    useEffect(() => {
        const getCats = async() => {
            const res = await axios.get('/categories')
            setCats(res.data)
        }
        getCats()
    })
    return (
        <div className="category">
            <div className="category-card">
                <h2>Categories</h2>
                <ul className="category-links">
                    {cats.map((cat) => (
                        <Link to={`/?cat=${cat.name}`} className="link" key={cat._id} value={cat}>
                                <li>{cat.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}
