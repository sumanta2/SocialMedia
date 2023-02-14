import React, { useState,useEffect, useRef } from 'react'
import {useSelector} from "react-redux"
import Conversation from '../../components/Conversation/Conversation'
import LogoSearch from "../../components/LogoSearch/LogoSearch"
import { userChats } from '../../Api/ChatRequests'
import "./Chat.css"
import ChatBox from '../../components/ChatBox/ChatBox'
import {io} from "socket.io-client"
import { useMediaQuery } from '@mantine/hooks';
import NavIcons from '../../components/NavIcons/NavIcons'



const Chat = () => {
  const {user} = useSelector((state)=> state.authReducer.authData)
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [typingStartUsers,setTypingStartUsers]=useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  // const [messages, setMessages] = useState([])
  const socket= useRef()

  useEffect(()=> {
    socket.current=io(process.env.SOCKET_IO_SERVER || "http://localhost:8800")
    socket.current.emit("new-user-add",user._id)
    socket.current.on('get-users',(users) =>{
      setOnlineUsers(users)
    })
    return ()=>{
      socket.current.emit("offline", user._id);
      socket.current.close();
      socket.current.off('get-users');
      socket.current.off('new-user-add');
      socket.current.off("offline");
    }
  },[user])


  const handleFocus = () => {
    const chatMember= currentChat?.members.find((member)=>member!==user._id)
    const data={sender:user._id,receiver:chatMember}
    socket.current.emit("typing-start", data);

    return () => {
       socket.current.off('typing-start');
    };
  };

  // Remove Focus from searchBox
  const handleBlur = () => {
    socket.current.emit("typing-end", user._id);
    return () => {
      socket.current.off('typing-end');
    };
  }


  useEffect(() => {
    const getChats= async () =>{
      try {
        const {data}= await userChats(user._id)
        setChats(data);  //-------------------------------------------collect chat users data
        // console.log("data chat")
        // console.table(data);
      } 
      catch (error) {
        console.log(error); 
      } 
    }
    getChats()
  },[user])


  useEffect(() => {
    socket.current.on("get-typing-users", (users) => {
      setTypingStartUsers(users);
    });
    return () => {
      socket.current.off("get-typing-users");
    }; 
  }, [user]);



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

    const checkTypingStatus=(chat)=>{
      const chatMember= chat?.members.find((member)=>member!==user._id)
      const typing = typingStartUsers?.find((user)=>user.userPair.sender === chatMember)
        if(typing?.userPair.receiver===user._id)
        {
          return true
        }
        else{
          return false
        }
    }

    const filterChats=(id)=>{
        const data= chats.filter(({_id}) =>_id !== id)
        setChats(data);
        setCurrentChat(null)
    }

    const matches = useMediaQuery('(max-width: 630px)');
    const maxStyle={width:"20rem",alignSelf:"flex-end"}
    const minStyle={width:"10rem",alignSelf:"flex-end"}

  return (
    <div className='Chat'>
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch/>
        <div className="Chat-container">

           <h2>Chat</h2>
          <div className="Chat-list">
           {chats.map((chat)=>(
            <div key={chat._id} onClick={()=> setCurrentChat(chat) }>
              <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} filterChats={filterChats}  />
            </div>
           ))}
          </div>
        </div>
      </div>


      {/* Right side chat */}

      <div className="Right-side-chat">
        <div className='rightIcons' style={matches?minStyle:maxStyle}>
          <NavIcons/>
        </div>
        {/* Chat Body */}
        <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage} onFocus={handleFocus} onBlur={handleBlur} typing={checkTypingStatus(currentChat)}/>
      </div>
    </div>
  )
}

export default Chat