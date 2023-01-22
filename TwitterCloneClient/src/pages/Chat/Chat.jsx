import React, { useState,useEffect, useRef } from 'react'
import {useSelector} from "react-redux"
import Conversation from '../../components/Conversation/Conversation'
import LogoSearch from "../../components/LogoSearch/LogoSearch"
import {UilSetting} from "@iconscout/react-unicons"
import Home from "../../img/home.png"
import Noti from "../../img/noti.png"
import Comment from "../../img/comment.png"
import { userChats } from '../../Api/ChatRequests'
import "./Chat.css"
import { Link } from 'react-router-dom'
import ChatBox from '../../components/ChatBox/ChatBox'
import {io} from "socket.io-client"

const Chat = () => {
  const {user} = useSelector((state)=> state.authReducer.authData)
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  const socket= useRef()

  useEffect(()=> {
    socket.current=io(process.env.SOCKET_IO_SERVER || "http://localhost:8800")
    socket.current.emit("new-user-add",user._id)
    socket.current.on('get-users',(users) =>{
      setOnlineUsers(users)
    })
    return ()=>{
      socket.current.close();
      socket.current.off('get-users');
      socket.current.off('new-user-add');
    }
  },[user])


  useEffect(() => {
    const getChats= async () =>{
      try {
        const {data}= await userChats(user._id)
        setChats(data);  //-------------------------------------------collect chat users data
        console.log("data chat")
        console.table(data);
      } 
      catch (error) {
        console.log(error); 
      } 
    }
    getChats()
  },[user])


  // useEffect(() => {
  //   // Tab has focus
  //   const handleFocus = async () => {
  //     socket.current.emit("new-user-add", user._id);
  //     socket.current.on("get-users", (users) => {
  //       setOnlineUsers(users);
  //     });
  //   };

  //   // Tab closed
  //   const handleBlur = () => {
  //     // console.log("User Obj");
  //     // console.log(user);
  //     if(user) {
  //       socket.current.emit("offline",user._id);   
  //     }
  //   };

  //   // Track if the user changes the tab to determine when they are online
  //   window.addEventListener('focus', handleFocus);
  //   window.addEventListener('blur', handleBlur);
  //   // window.addEventListener("beforeunload",handleBlur);
  //   console.log("I call switch");

  //   return () => {
  //     window.addEventListener('blur', handleBlur);
  //     window.removeEventListener('focus', handleFocus);
  //     // window.addEventListener('popstate', handleBlur());
  //     // window.removeEventListener('blur', handleBlur);
  //     // window.removeEventListener('beforeunload', handleBlur);
  //     socket.current.off('get-users');
  //     socket.current.off('new-user-add');
  //     socket.current.off("offline");
  //   }; 
  // }, [user]);



  //send message to the socket server
  useEffect(() => {
    if(sendMessage!== null)
    {
      // console.log("send Message");
      // console.log(sendMessage);
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage])
  
  //receive message from the socket server
    useEffect(() => {
      socket.current.on('receive-message', (data) => {
        // console.log("recieved message");
        // console.log(data);
        setReceiveMessage(data);
      });
      return ()=>{
        socket.current.off('receive-message');
      }
    },[])

    const checkOnlineStatus= (chat)=>{
      const chatMember= chat.members.find((member)=>member!==user._id)
      const online = onlineUsers.find((user)=>user.userId === chatMember);
      return online? true:false;
    }

  return (
    <div className='Chat'>
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch/>
        <div className="Chat-container">

           <h2>Chat</h2>{/*--------------------------------------------------------------------------------------------------------*/}
          <div className="Chat-list">
           {chats.map((chat)=>(
            <div key={user._id} onClick={()=> setCurrentChat(chat) }>
              <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
            </div>
           ))}
          </div>
        </div>
      </div>


      {/* Right side chat */}

      <div className="Right-side-chat">
        <div style={{width:"20rem",alignSelf:"flex-end"}}>
          <div className="navIcons">
            <Link to="../home">
              <img src={Home} alt="" />
            </Link>
            <UilSetting/>
            <img src={Noti} alt="" />
            <Link to="../chat">
              <img src={Comment} alt="" />
            </Link>
          </div>
        </div>
        {/* Chat Body */}
        <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
      </div>
    </div>
  )
}

export default Chat