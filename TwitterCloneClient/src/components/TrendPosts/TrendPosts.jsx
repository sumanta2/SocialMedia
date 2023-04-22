import React, { useState, useEffect } from 'react'
import "./TrendPosts.css"
import Post from '../Post/Post'
import { UilArrowLeft } from '@iconscout/react-unicons'
import { getSpecificHashtagAllPost } from "../../Api/HashtagRequest"
import { deletePost } from '../../Api/PostRequest'
//import { useQuery } from '@tanstack/react-query'
import { LoadingAnimation, ErrorAnimation } from '../LoadingErrorAnimation/LoadingErrorAnimation'


const TrendPosts = ({ showTrendingPost, setShowTrendingPost }) => {
     const [trendingPosts, setTrendingPosts] = useState([])
     const [loadingError, setLoadingError] = useState({ loading: false, error: false })


    //const { data,isLoading,isError, error,refetch,isFetching,dataUpdatedAt,status } = useQuery(['SpecificHashtagAllPost'],
    //useQuery hook work properly but if no network connection in this case it fetch data from cache unExpectedly but without useQuery if call within try catch block in this case the network not present error display properly
    // const { data:oneData,isError,refetch,isFetching,} = useQuery(['SpecificHashtagAllPost'],
    //     async () => { 
    //             const { data } = await getSpecificHashtagAllPost(showTrendingPost)
    //             return data
    //     }
    //   )

    const deleteTrendingPost = async (dataId, userId) => { 
        const data=trendingPosts.filter((post) => post._id !== dataId)
        setTrendingPosts(data)
        await deletePost(dataId, userId)
    }
    const fetchData = async () => {
        try {
            //await refetch()
            setLoadingError({ loading: true, error:false })
            const { data } = await getSpecificHashtagAllPost(showTrendingPost);
            setLoadingError({loading: false,error:false })
            setTrendingPosts(data)
        } catch (error) {
            setLoadingError({ loading: false, error: true })
            console.log(error)
        }
    }



    useEffect( () => {
         fetchData();
    }, [showTrendingPost])
  
    useEffect( () => {
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
            {loadingError.loading ? <LoadingAnimation height={100} width={100} /> :trendingPosts.length===0? "No Data Found..":
                loadingError.error ? <ErrorAnimation height={100} width={100}  /> :trendingPosts.map((post, id) => {
                    return (
                        <Post data={post} id={id} key={id} setShowTrendingPost={setShowTrendingPost} deleteTrendingPost={deleteTrendingPost}  />
                    )
                })}
        </div>

    )
}

export default TrendPosts