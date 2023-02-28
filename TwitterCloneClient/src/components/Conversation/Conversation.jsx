//here all users whose i try to chat present in left side of chat list are display


import React,{useState,useEffect} from 'react'
import {getUser} from '../../Api/UserRequest'
import {deleteChat} from "../../Api/ChatRequests";
import {deleteMessages} from "../../Api/MessageRequest";
import { UilTrashAlt } from '@iconscout/react-unicons'
import "./Conversation.css";

const Conversation = ({data,currentUserId,online,filterChats}) => {

    const [userData, setUserData] = useState(null)
    const [hover, setHover] = useState(false);
    useEffect(() =>{
        const userId= data.members.find((id)=> id !== currentUserId)

        const getUserData= async() =>{
          try {
            const {data} = await getUser(userId)
            setUserData(data);
            // console.log(data);
          } catch (error) {
            console.log(error);
          }            
        }
        getUserData();
    },[currentUserId,data.members])

    const handleClick= async(id) => {
      filterChats(id);
      await deleteChat(id);
      filterChats(id);
      await deleteMessages(id)
    }
  return (
    <>
      <div className='follower conversation'>
        <div  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          {online=== "true" && <div className="online-dot"></div>}
          {hover && <UilTrashAlt onClick={()=> handleClick(data._id)} className="deleteChat" size={33}/>}
            
            <img src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER+userData.profilePicture:process.env.REACT_APP_PUBLIC_FOLDER+"defaultProfile.png"} alt="{}" className='followerImage' style={{width:'50px',heigh:'50px'}}/>
            <div className="name" style={{fontSize:"0.8rem"}}>
              <span>{userData?.firstname} {userData?.lastname}</span>
              <span>{online==="true" ? "Online": "Offline"}</span>

            </div>
        </div>
      </div>
      <hr style={{width:'85%', border:"0.1px solid #ececec"}}/>
    </>
  )
}

export default Conversation