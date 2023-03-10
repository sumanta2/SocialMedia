import React,{useEffect} from 'react'
import "./Posts.css"
import { useDispatch,useSelector } from 'react-redux'
import Post from '../Post/Post'
import { getTimelinePosts } from '../../Actions/postAction'
import { useParams } from "react-router-dom";
import animationNoPost from "../../img/animation/629-empty-box.json"
import LottieRenderer from "../LottieRenderer/LottieRenderer"
const Posts = ({profileSide}) => {
  const dispatch=useDispatch()
  const params = useParams()
  const {user}= useSelector((state)=>state.authReducer.authData)
  let {posts,loading}=useSelector((state)=> state.postReducer)

  useEffect(() => {
      dispatch(getTimelinePosts(user._id))
  
     }, [dispatch, user._id])
     if(posts.length===0) return <div style={{margin:"0px auto"}}><LottieRenderer animationData={animationNoPost} height={300} width={300} loop={false} autoplay={true}/></div>;
    if(params.id)
     {
      posts = posts.filter((post)=> post.userId===params.id)
      if(posts.length===0) return <div style={{margin:"0px auto"}}><LottieRenderer animationData={animationNoPost} height={300} width={300} loop={false} autoplay={true}/></div>;
    
    }

  return (
    
    <div className="Posts">
        { loading? "Fetching Posts...":
            posts.map((post,id)=>{
                return(
                    <Post data={post} id={id} key={id}/>
                )
 
            })
        }
    </div>
  )
}

export default Posts