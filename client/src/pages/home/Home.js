import React, { useEffect, useState } from 'react'
import Category from '../../components/category/Category'
import Main from '../../components/main/Main'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import axios from 'axios'
import './home.css'
import { useLocation } from 'react-router-dom'

export default function Home() {
    const [posts, setPosts] = useState([])
    const {search} = useLocation()

    useEffect(() => {
        const fetchPosts = async() => {
            const res = await axios.get(`/posts/${search}`)
            setPosts(res.data)
        }
        fetchPosts()
    },[search])
    return (
        <div>
            <Topbar />
            <div className="home">
                <Sidebar />
                <Main posts={posts}/>
                <Category />
            </div>
        </div>
    )
}
