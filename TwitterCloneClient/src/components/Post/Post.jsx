import React,{useState} from 'react'
import "./Post.css"
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import Comment from "../../img/comment.png"
import Share from "../../img/share.png"
import { UilTrashAlt } from '@iconscout/react-unicons'  
import { deletePost,likeUnlikePost } from '../../Actions/postAction';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import addLike from "../../img/animation/61914-like.json"
import removeLike from "../../img/animation/61911-remove-like.json"
import LottieRenderer from '../LottieRenderer/LottieRenderer';
import Liked from "../../img/Liked.png"
import UnLiked from "../../img/unLiked.png"



const Post = ({data,id}) => {
  const [preventRender, setPreventRender] = useState(true)
  const {user}=useSelector((state)=>state.authReducer.authData)
  const posts=useSelector((state)=>state.postReducer.posts)
  const dispatch=useDispatch()





  const img=process.env.REACT_APP_IMAGE_EXTENSION.split("-")
  const video=process.env.REACT_APP_VIDEO_EXTENSION.split("-") 


  const ext= data?.image?.split(".").pop();
  const chkImg= img.includes(ext);
  const chkVdo=video.includes(ext);


  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes,setLikes]=useState(data.likes.length)  //data.likes show it is empty but it show its length is 1

  const handleDelete=(e)=>{
    toast.success('Deleted', {duration: 3000});
    dispatch(deletePost(data._id,user._id))
  }

  useEffect(()=>{
    setLiked(data.likes.includes(user._id))    //!Warning normally when i upload any file automatically active the like icon to prevent that i use this 
    setLikes(data.likes.length)
  },[posts])
  

  const handleLike= ()=>{
    setLiked((prev)=>!prev)
    dispatch(likeUnlikePost(data,user._id))
    if(liked)
    {
       setLikes((prev)=>prev-1)
       toast.success('UnLiked', {duration: 3000});

    }
    else{

      setLikes((prev)=>prev+1)
      toast.success('Liked', {duration: 3000});
    }
  }

  const handleShare= async ()=>{
    const link=process.env.REACT_APP_PUBLIC_FOLDER+data.image;
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Link Copied', {duration: 3000});
    } 
    catch (error) {
      console.error("Failed to copy text: ", error);
    }
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
          <div className="postReact" >
              <div style={{"cursor":"pointer",width:"29px",height:"26px",position:"relative",top:"-29px",left:"-26px"}} alt="" onClick={handleLike} >
                        {preventRender? (<img src={liked?Liked:UnLiked} alt="" style={{position:"relative",width:"24px",top:"30px",left:"31px"}} onClick={()=>setPreventRender(false)}/>):
                        <LottieRenderer animationData={liked?addLike:removeLike} height={85} width={85} loop={false} autoplay={true}/>}
                </div>
                      
              <img src={Comment} alt="" style={{"cursor":"pointer"}} />

              <div onClick={handleShare}>
                <img src={Share} alt=""  style={{"cursor":"pointer"}} />
              </div>

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