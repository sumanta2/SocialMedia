import React,{useEffect} from 'react'
import "./Posts.css"
import { useDispatch,useSelector } from 'react-redux'
import { PostsData } from '../../Data/PostsData'
import Post from '../Post/Post'
import { getTimelinePosts } from '../../Actions/postAction'
import { useParams } from "react-router-dom";
const Posts = ({profileSide}) => {
  const dispatch=useDispatch()
  const params = useParams()
  const {user}= useSelector((state)=>state.authReducer.authData)
  let {posts,loading}=useSelector((state)=> state.postReducer)

  useEffect(() => {
      dispatch(getTimelinePosts(user._id))
  
     }, [])
     if(!posts) return 'No Posts';
    if(params.id) posts = posts.filter((post)=> post.userId===params.id)
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