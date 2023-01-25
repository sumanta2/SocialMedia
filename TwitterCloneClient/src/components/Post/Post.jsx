import React,{useState} from 'react'
import "./Post.css"
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import Comment from "../../img/comment.png"
import Share from "../../img/share.png"
import Heart from "../../img/like.png"
import NotLike from "../../img/notlike.png"
import { likePost } from '../../Api/PostRequest'
import { UilTrashAlt } from '@iconscout/react-unicons'  
import { deletePost } from '../../Actions/postAction';


const Post = ({data,id}) => {
  const {user}=useSelector((state)=>state.authReducer.authData)
  const [liked, setLiked] = useState(data.likes.includes(user._id))
  // console.log("🚀 ~ file: Post.jsx:17 ~ Post ~ user._id", user._id)
  // console.log("🚀 ~ file: Post.jsx:17 ~ Post ~ data.likes", data.likes)
  // console.log("🚀 ~ file: Post.jsx:17 ~ Post ~ liked", liked)
  const [likes,setLikes]=useState(data.likes.length)
  //  console.log("🚀 ~ file: Post.jsx:18 ~ Post ~ data.likes", data)
  const dispatch=useDispatch()



  const img=process.env.REACT_APP_IMAGE_EXTENSION.split("-")
  const video=process.env.REACT_APP_VIDEO_EXTENSION.split("-") 


  const ext= data?.image?.split(".").pop();
  const chkImg= img.includes(ext);
  const chkVdo=video.includes(ext);


  const handleDelete=(e)=>{

      dispatch(deletePost(data._id,user._id))
  }

  const handleLike= ()=>{
    setLiked((prev)=>!prev)
     likePost(data._id,user._id)
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  }
  return (
    <div className="Post">
      { chkImg ? <img src={data?.image? process.env.REACT_APP_PUBLIC_FOLDER+data.image: ""} alt="" />
      :chkVdo?
      <video controls  style={{"maxHeight":"400px"}}> 
            <source src={data?.image? process.env.REACT_APP_PUBLIC_FOLDER+data.image: ""} type="video/mp4"/> </video>
      :"Sorry can't Found this content"
      }
        <div className="reactionContain">
          <div className="postReact">
              <img src={liked? Heart:NotLike} style={{"cursor":"pointer"}} alt="" onClick={handleLike} />
              <img src={Comment} alt="" style={{"cursor":"pointer"}} />
              <img src={Share} alt="" style={{"cursor":"pointer"}} />
          </div>
          <div className='reactionRight'>
            {
              data.userId === user._id ? <UilTrashAlt style={{"cursor":"pointer"}} onClick={handleDelete}/>:""
            }
          </div>
        </div>
        <span style={{color:"var(--gray)",fontSize:"12px"}}>{likes} likes</span>
        <div className="detail">
            <span><b>{data.name}</b></span>
            <span> {data.desc}</span>
        </div>
    </div>
  )
}

export default Post