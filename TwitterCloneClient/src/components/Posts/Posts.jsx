import React, { useState, useEffect } from 'react'
import "./Posts.css"
import { useDispatch, useSelector } from 'react-redux'
import Post from '../Post/Post'
import { getTimelinePosts } from '../../Actions/postAction'
import { removePostId } from '../../Actions/AuthAction'
import { getOnePosts, getSpecificUserPosts } from '../../Api/PostRequest'
import { useParams, useNavigate } from "react-router-dom";
import animationNoPost from "../../img/animation/629-empty-box.json"
import LottieRenderer from "../LottieRenderer/LottieRenderer"
import { UilArrowLeft } from '@iconscout/react-unicons'

const Posts = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { postId, id } = useParams();
  const { user } = useSelector((state) => state.authReducer.authData)
  const { animationRepeatType } = useSelector((state) => state.settingsReducer.Animation)
  let { posts, loading } = useSelector((state) => state.postReducer)
  const globalPostId = useSelector((state) => state.authReducer.postId)
  const [getPostId, setGetPostId] = useState(postId)
  const [putOnePosts, setPutOnePosts] = useState(null)
  const [checkError, setCheckError] = useState(null)
  const [userPosts, setUserPosts] = useState(null)
  const [loadingError, setLoadingError] = useState({loading:false,error:false})
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await getOnePosts(getPostId)
      setPutOnePosts(data[0])

    } catch (error) {
      console.log(error)
      setCheckError(true)
    }
  }

  const fetchPost = async (id) =>
  { 
    try {
      setLoadingError({loading:true,error:false})
      const { data } = await getSpecificUserPosts(id)
      setLoadingError({ loading: false, error: false })
      setUserPosts(data)
    } catch (error) {
      console.log(error)
      setLoadingError({ loading:false , error:true})

    }
  
  }

  useEffect(() => {
    if (id && user._id !== id) {
      fetchPost(id)
    }
  }, [id, user._id])
  

useEffect(() => {
  if (!getPostId) {
    setGetPostId(globalPostId)
  }
}, [globalPostId]);
useEffect(() => {
  if (!getPostId) {
    dispatch(getTimelinePosts(user._id))
  }
  else {
    fetchData(getPostId);
  }



}, [dispatch, user._id, getPostId])
  
 
  if (id && user._id !== id) {
    
    if (loadingError.loading) return "Fetching Posts....."
    if (loadingError.error) return "Failed to fetch posts"
    
    if( userPosts?.length === 0) return <div style={{ margin: "0px auto" }}><LottieRenderer animationData={animationNoPost} height={300} width={300} loop={animationRepeatType === 'loop' ? true : false} autoplay={animationRepeatType === 'one' || animationRepeatType === 'loop' ? true : false} /></div>
  return (
    <div className='Posts'>
      {userPosts?.map((post, id) => (
        <Post data={post} id={id} key={id} />
      ))}
    </div>
  )
}
  
  

if (posts.length === 0) return <div style={{ margin: "0px auto" }}><LottieRenderer animationData={animationNoPost} height={300} width={300} loop={animationRepeatType === 'loop' ? true : false} autoplay={animationRepeatType === 'one' || animationRepeatType === 'loop' ? true : false} /></div>;
if (params.id && params.id === user._id) {
  posts = posts.filter((post) => post.userId === params.id)
  if (posts.length === 0) return <div style={{ margin: "0px auto" }}><LottieRenderer animationData={animationNoPost} height={300} width={300} loop={animationRepeatType === 'loop' ? true : false} autoplay={animationRepeatType === 'one' || animationRepeatType === 'loop' ? true : false} /></div>;

}


  const handleClick = () => {
    setGetPostId(null);
    setPutOnePosts(null);
    if (globalPostId) {
      dispatch(removePostId());

      navigate("../")
    }
    else {
      navigate("../../")
    }

  }

  return (

    <div className="Posts">
      {getPostId ? checkError ?

        (<div>
          <div className='backBtn' onClick={handleClick}>
            <UilArrowLeft />
          </div>
          <span> Error Occurred When Fetching Post </span>
        </div>) :

        putOnePosts ? (<div>
          <div className='backBtn' onClick={handleClick}>
            <UilArrowLeft />
          </div>
          <Post data={putOnePosts} id={1} />
        </div>) : "Loading..."

        : loading ? "Fetching Posts..." :
          posts.map((post, id) => {
            return (
              <Post data={post} id={id} key={id} />
            )
          })
      }
    </div>
  )

}

export default Posts