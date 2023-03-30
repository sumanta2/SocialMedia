import React, { useState, useEffect } from 'react'
import "./TrendPosts.css"
import Post from '../Post/Post'
import { UilArrowLeft } from '@iconscout/react-unicons'
import { getSpecificHashtagAllPost } from "../../Api/HashtagRequest"

const TrendPosts = ({ showTrendingPost, setShowTrendingPost }) => {
    const [trendingPosts, setTrendingPosts] = useState([])
    const [loadingError, setLoadingError] = useState({ loading: false, error: false })

    const fetchData = async () => {
        try {
            setLoadingError({ loading: true, error:false })
            const { data } = await getSpecificHashtagAllPost(showTrendingPost);
            setLoadingError({loading: false,error:false })
            setTrendingPosts(data)
        } catch (error) {
            setLoadingError({ loading: false, error: true })
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [showTrendingPost])

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="TrendPosts" >
            <div className="backWrapper">
                <div className='backBtn' onClick={() => setShowTrendingPost(null)} >
                    <UilArrowLeft className="arrowIcon" />
                </div>
                <span className='hashTag'>#{showTrendingPost}</span>
            </div>
            {loadingError.loading ? "Loading..." :
                loadingError.error ? "Failed to fetch Data" : trendingPosts.map((post, id) => {
                    return (
                        <Post data={post} id={id} key={id} />
                    )
                })}
        </div>

    )
}

export default TrendPosts