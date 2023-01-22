import React,{useState} from 'react'
import "./Post.css"
import {useSelector} from 'react-redux'
import Comment from "../../img/comment.png"
import Share from "../../img/share.png"
import Heart from "../../img/like.png"
import NotLike from "../../img/notlike.png"
import { likePost } from '../../Api/PostRequest'


const Post = ({data,id}) => {
  const {user}=useSelector((state)=>state.authReducer.authData)
  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes,setLikes]=useState(data.likes.length)

  const img=["jpg", "png", "jpeg", "gif",]
  const video=["mp4", "mov","wmv","avi",]

  const ext= data?.image.split(".").pop();
  const chkImg= img.includes(ext);
  const chkVdo=video.includes(ext);



  const handleLike=()=>{
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
        
        <div className="postReact">
            <img src={liked? Heart:NotLike} style={{"cursor":"pointer"}} alt="" onClick={handleLike} />
            <img src={Comment} alt="" style={{"cursor":"pointer"}} />
            <img src={Share} alt="" style={{"cursor":"pointer"}} />
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