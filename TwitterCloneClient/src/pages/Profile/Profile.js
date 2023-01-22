import React,{useState,useEffect,useRef} from 'react'

import PostSide from '../../components/PostSide/PostSide'
import { Drawer,ScrollArea } from '@mantine/core';
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import { useMediaQuery } from '@mantine/hooks';
import "./Profile.css"
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import {io} from "socket.io-client"


const Profile = () => {
  const matches = useMediaQuery('(min-width: 723px)');
  const matches1 = useMediaQuery('(min-width: 942px)');

  const [CheckOpened, setCheckOpened] = useState(false)
  const [OnlineUsers, setOnlineUsers] = useState(null)



  //when leave chat page to home change status online to offline
  const {user}=useSelector((state)=>state.authReducer.authData)
  const socket=useRef()
  const location =useLocation()
  useEffect(()=> {
    socket.current=io(process.env.SOCKET_IO_SERVER || "http://localhost:8800")
    //socket.current.emit("new-user-add",user._id)
    socket.current.on('get-users',(users) =>{
      setOnlineUsers(users)
    })
    return ()=>{
       socket.current.close();
       socket.current.off('get-users');
    }
  },[])
  // const exist1= onlineUsers?.some((activeUser)=>activeUser.userId===user._id);
  // setExists(exist1);
  useEffect(()=>{
    if(location.pathname!=="/chat")
    {
      if(user) {
        socket.current.emit("offline",user._id);   
      }
    }
  },[location])



  return (
    <div className="Profile">
      {matches?<ProfileLeft/>:""}
        
        
        <div className="Profile-center">
            <ProfileCard location="profilePage"/>
            <PostSide Opened={CheckOpened} setOpened={setCheckOpened} />
        </div>
        
      {matches1?<RightSide/>:""}
      
      {/* <RightSide/> */}
      <Drawer
          opened={CheckOpened}
          onClose={() => setCheckOpened(false)}
          title=""
          padding="xl"
          size="md"
          // style={{ backgroundColor:"#f3f3f3"}}
          >
          <ScrollArea  className="Home" style={{height:"100%"}}>
            <ProfileLeft/>
            <RightSide/>
          </ScrollArea>
      </Drawer>


    </div>
  )
}

export default Profile