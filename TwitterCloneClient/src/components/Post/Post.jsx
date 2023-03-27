import React, { useState } from 'react'
import "./Post.css"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import Comment from "../../img/comment.png"
import Share from "../../img/share.png"
import { UilTrashAlt } from '@iconscout/react-unicons'
import { UilClipboardNotes } from '@iconscout/react-unicons'
import { UilWhatsapp } from '@iconscout/react-unicons'
import { deletePost, likeUnlikePost } from '../../Actions/postAction';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import addLike from "../../img/animation/61914-like.json"
import removeLike from "../../img/animation/61911-remove-like.json"
import LottieRenderer from '../LottieRenderer/LottieRenderer';
import Liked from "../../img/Liked.png"
import UnLiked from "../../img/unLiked.png"
import { Menu, Modal } from '@mantine/core';
import  CommentComp from '../CommentComp/CommentComp';
import {createComment,getAllComments,deleteComment} from "../../Api/CommentRequest"



const Post = ({ data, id }) => {
  const [preventRender, setPreventRender] = useState(true)
  const [opened, setOpened] = useState(false);
  const [comments, setComments] = useState([])
  const [inputComment, setInputComment] = useState("")
  const { user } = useSelector((state) => state.authReducer.authData)
  const posts = useSelector((state) => state.postReducer.posts)
  const {notificationDuration}=useSelector((state) => state.settingsReducer.Notification)
  const dispatch = useDispatch()



  const img = process.env.REACT_APP_IMAGE_EXTENSION.split("-")
  const video = process.env.REACT_APP_VIDEO_EXTENSION.split("-")


  const ext = data?.image?.split(".").pop();
  const chkImg = img.includes(ext);
  const chkVdo = video.includes(ext);


  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length)  //data.likes show it is empty but it show its length is 1

  const handleDelete = (e) => {
    toast.success('Deleted', { duration: parseInt(notificationDuration) });
    dispatch(deletePost(data._id, user._id))
  }

  useEffect(() => {
    setLiked(data.likes.includes(user._id))    //!Warning normally when i upload any file automatically active the like icon to prevent that i use this 
    setLikes(data.likes.length)
  }, [posts, data.likes, user._id])


  const handleLike = () => {
    setLiked((prev) => !prev)
    dispatch(likeUnlikePost(data, user._id))
    if (liked) {
      setLikes((prev) => prev - 1)
      toast.success('UnLiked', { duration: parseInt(notificationDuration) });

    }
    else {

      setLikes((prev) => prev + 1)
      toast.success('Liked', { duration: parseInt(notificationDuration) });
    }
  }

  const copyToClipboard = async () => {
    const link = process.env.REACT_APP_PUBLIC_FOLDER + data.image;
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Link Copied', { duration: parseInt(notificationDuration) });
    }
    catch (error) {
      console.error("Failed to copy text: ", error);
    }
  }

  const shareToWhatsapp = () => {
    const link = process.env.REACT_APP_PUBLIC_FOLDER + data.image;
    const encodedMessage = encodeURIComponent(link);
    window.open(`whatsapp://send?text=${encodedMessage}`);
  }

  const fetchComments = async(id) => {
    setOpened(true)
    try {
      const {data} = await getAllComments(id)
      setComments(data)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCommentHandler = async (id) => {
    try {
      const data = comments.filter(comment => comment._id !== id)
      setComments(data)
      await deleteComment(id)
    } catch (error) {
      console.log(error)
    }
  }

  const createCommentHandler = async () => {
    const loginUser={firstname:user.firstname,lastname:user.lastname,profilePicture:user.profilePicture}
    try {
      var commentData={userId:user._id,contentId:data._id,text:inputComment}
      setInputComment("")
      var {data:myVal} = await createComment(commentData)
      myVal = { ...myVal, user:loginUser }
      setComments([myVal,...comments])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="Post">
      <div className="detail">
        <span><b>{data.name}</b></span>
        <span> {data.desc}</span>
      </div>
      {chkImg ? <img src={data?.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="" />
        : chkVdo ?
          <video controls style={{ "maxHeight": "400px" }}>
            <source src={data?.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} type="video/mp4" /> </video>
          : ""
      }
      <div className="reactionContain">
        <div className="postReact" >
          <div style={{ "cursor": "pointer", width: "29px", height: "26px", position: "relative", top: "-29px", left: "-26px" }} alt="" onClick={handleLike} >
            {preventRender ? (<img src={liked ? Liked : UnLiked} alt="" style={{ position: "relative", width: "24px", top: "30px", left: "31px" }} onClick={() => setPreventRender(false)} />) :
              <LottieRenderer animationData={liked ? addLike : removeLike} height={85} width={85} loop={false} autoplay={true} />}
          </div>

          <img src={Comment} alt="" onClick={()=>fetchComments(data._id)} style={{ "cursor": "pointer",zIndex:"12" }} />


          <Menu control={<img src={Share} alt=""  style={{"cursor":"pointer"}} />}>
            <Menu.Label >Share</Menu.Label>
            <Menu.Item icon={<UilClipboardNotes/>} onClick={copyToClipboard}>Clipboard</Menu.Item>
            <Menu.Item icon={<UilWhatsapp color="#00FF5F"/>} onClick={shareToWhatsapp}>Whatsapp</Menu.Item>
          </Menu>

  
        </div>
        <div className='reactionRight'>
          {
            data.userId === user._id ? <UilTrashAlt style={{ "cursor": "pointer" }} onClick={handleDelete} /> : ""
          }
        </div>
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>{likes} likes</span>

      <Modal className='myModal'
        opened={opened}
        onClose={() => setOpened(false)}
        title="Comment"
        centered
      >
        <div className="inputCommentDiv">
          <input type="text" value={inputComment} onChange={(e)=>setInputComment(e.target.value)} placeholder='Enter your Comment' /> <button className='button ps-button' type="button" onClick={createCommentHandler} disabled={inputComment ===""}> Submit </button>
        </div>
        <div className="commentBox">
        {
          comments.length === 0 ? <span className='noComment'>Empty Comment</span> :
            comments.map((comment, index) => <div key={comment._id}><CommentComp comment={comment} userId={user._id} deleteComment={deleteCommentHandler} /></div>)
          }
        </div>
      </Modal>
    </div>
  )
}

export default Post