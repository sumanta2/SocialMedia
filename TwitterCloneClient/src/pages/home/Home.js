import React,{useState,useEffect,useRef} from 'react'
import { useMediaQuery } from '@mantine/hooks';
import { Drawer,ScrollArea } from '@mantine/core';
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profieSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
// import { useLocation } from 'react-router-dom';
// import { useSelector } from "react-redux";
// import {io} from "socket.io-client"


const Home = () => {

  const matches = useMediaQuery('(min-width: 678px)');
  const [Opened, setOpened] = useState(false)
  // const [OnlineUsers, setOnlineUsers] = useState(null)


  //when leave chat page to home change status online to offline
  // const {user}=useSelector((state)=>state.authReducer.authData)
  // const socket=useRef()
  // const location =useLocation()
  // useEffect(()=> {
  //   socket.current=io(process.env.SOCKET_IO_SERVER || "http://localhost:8800")
  //   //socket.current.emit("new-user-add",user._id)
  //   socket.current.on('get-users',(users) =>{
  //     setOnlineUsers(users)
  //   })
  //   return ()=>{
  //      socket.current.close();
  //      socket.current.off('get-users');
  //   }
  // },[])
  // // const exist1= onlineUsers?.some((activeUser)=>activeUser.userId===user._id);
  // // setExists(exist1);
  // useEffect(()=>{
  //   if(location.pathname!=="/chat")
  //   {
  //     if(user) {
  //       socket.current.emit("offline",user._id);   
  //     }
  //   }
  // },[location])




  return (
    <div className='Home'>
        {matches?<ProfileSide/>:""}
        <PostSide Opened={Opened} setOpened={setOpened}/>
        {matches?<RightSide/>:""}
        <Drawer
            opened={Opened}
            onClose={() => setOpened(false)}
            title=""
            padding="xl"
            size="md"
            // style={{ backgroundColor:"#f3f3f3"}}
            >
            <ScrollArea  className="Home" style={{height:"100%"}}>
              <ProfileSide/>
              <RightSide/>
            </ScrollArea>
        </Drawer>
    </div>
  )
}

export default Home