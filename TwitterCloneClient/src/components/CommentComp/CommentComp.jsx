import React,{useState} from 'react'
import "./CommentComp.css"
import thumbsUpFilled from "../../img/thumbsUpFilled.png"
import thumbsUpUnFilled from "../../img/thumbsUpUnFilled.png"
import { UilTrashAlt } from '@iconscout/react-unicons'
import {likeUnlikeComment} from "../../Api/CommentRequest"



const CommentComp = ({ comment,userId,deleteComment }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const [Like, setLike] = useState(comment.likes.includes(userId))
  
  const handleLike = async () => { 
    try {
      if (Like) {
        setLike(false)
        comment.likes.pop(userId)
      }
      else {
        setLike(true)
        comment.likes.push(userId)
      }
      await likeUnlikeComment(comment._id, userId)
    } catch (error) {
      console.log(error)
      setLike(!Like)
      if (Like)
      {
        comment.likes.push(userId)
      }
      else
      {
        comment.likes.pop(userId)
      }
    }
  }

  
  return (
    <div key={comment._id} className='outerDiv'>
      <div className='innerDiv'>
        <div className='innerDiv1'>
          <img className="profileImg" src={serverPublic + comment.user.profilePicture} alt="Img" />
          <span className='userName'>{comment.user.firstname} {comment.user.lastname}</span>
        </div>
        <div className='innerDiv2'>
          {userId===comment.userId?<UilTrashAlt style={{ "cursor": "pointer", "paddingRight": "10px" }} onClick={()=> deleteComment(comment._id)} /> :""}
          <img className="likeReact" src={Like?thumbsUpFilled:thumbsUpUnFilled} style={{ "cursor": "pointer" }} alt="Img" onClick={handleLike} />
        </div>
      </div>
      <span className='commentText'>{comment.text}</span>
    </div>
  )
}

export default CommentComp;


