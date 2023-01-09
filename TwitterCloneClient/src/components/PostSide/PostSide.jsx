import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import "./PostSide.css"
const PostSide = ({Opened,setOpened}) => {
  return (
    <div className="PostSide">
        <PostShare Opened={Opened} setOpened={setOpened}/>
        <Posts profileSide={true}/>
    </div>
  )
}

export default PostSide