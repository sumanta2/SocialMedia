import React, { useState, useEffect, useRef} from "react";
import { getUser } from "../../Api/UserRequest";
import { addMessage, getMessages,deleteOneMessage } from "../../Api/MessageRequest";
import moment from 'moment';
import InputEmoji from "react-input-emoji";
import toast from 'react-hot-toast';
import { Menu } from '@mantine/core';
import { UilTrashAlt } from '@iconscout/react-unicons'
import { UilClipboardNotes } from '@iconscout/react-unicons'
// import { UilCheck } from '@iconscout/react-unicons'

const ChatBox = ({ chat, currentUser ,setSendMessage,receiveMessage,onFocus,onBlur,typing,online,socketRef,recipient}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("");
  // const [reachMessage,setReachMessage]=useState(false)
  const scroll= useRef()

  //fetching data for header 
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
      

    if((receiveMessage !== null)&&(receiveMessage.chatId === chat?._id)) {

      setMessages([...messages,receiveMessage])
      // console.log("Received message ChatBox2")
      // console.log(receiveMessage)
    } 


  }, [receiveMessage,chat?._id])   //here can not pass "messages" as a dependency if pass it create error in infinite loop
  

  //fetching data for messages
  useEffect(() => {
    const fetchMessages= async() => {
      try {
        const {data} = await getMessages(chat._id)
        // console.log(data);
        setMessages(data);

      } catch (error) {
        console.log(error);
      }
    }
    if(chat !== null) fetchMessages();
  }, [chat])
  
  const handleChange =  (newMessage) => {
    setNewMessage(newMessage);
  } 

  const handleSend = async (e) => {
    e.preventDefault();
    const message= {
      senderId: currentUser,
      text:newMessage,
      chatId: chat._id,
    }

    //send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages,data])
      setNewMessage("")
      setSendMessage(data);

    } catch (error) {
        console.log(error);
    }
  }


  //always scroll to the last message
  useEffect(() =>{
    scroll.current?.scrollIntoView({behavior:"auto"});  //in place of auto if provided smooth it smoothly scroll beginning to end
  }, [messages])
  
  useEffect(() => {
    socketRef.current?.on("delete-message-id", (id) => {
      const value = messages.filter((message) => message._id !== id)
      setMessages(value)
      toast.success('One Message deleted By user', { duration: 3000 });
    })
    return () => {
        socketRef.current?.off("delete-message-id")
    };
  }, [messages])  //if i does not put messages in the dependency list when delete message by sender in reliever end data does not delete in real time(sometime)
  const deleteMessage = async (id) => {
    
    try {
      await deleteOneMessage(id)
      const value = messages.filter((message) => message._id !== id)
      setMessages(value)
      socketRef.current.emit('delete-message', id,recipient);
    } catch (error) {
      console.log(error)
    }
    return () => {
      socketRef.current.off("delete-message");
    }
  }
  const copyToClipboard = async (data) => {
    try {
      await navigator.clipboard.writeText(data);
      toast.success('Text Copied', { duration: 3000 });
    }
    catch (error) {
      console.error("Failed to copy text: ", error);
    }
  }

  return (
    <>
      <div className="ChatBox-container">
      {
        chat? (
          <>
            <div className="chat-header"> 
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt="{}"
                    className="followerImage"
                    style={{ width: "50px", heigh: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.8rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                      </span>
                      <span style={{color:"blue"}}>
                        {typing ?"typing...": online === "true" ? "Online" : "Last Seen " + online}
                      </span>
                  </div>
                </div>
              </div>
              <hr style={{width:'85%',border:'0.1px solid #ececec'}}/>
            </div>

            {/* Chat Box Messages */}
            <div className="chat-body">
              {
                  messages.map((message, no) => (
                    
                    <Menu key={no} ref={scroll} control={
                      // <div className="">
                      <div className={message.senderId === currentUser ? " message own" : "message"}>
                        <span>{message.text}</span>
                        <div style={{ display: "flex" }}><span>{moment(message.createdAt).fromNow()}</span></div>
                      </div>
                    } style={message.senderId === currentUser ? { alignSelf: "flex-end" } : {}}>
                      {message.senderId === currentUser ? <Menu.Item icon={<UilTrashAlt color="#FF0000" />} onClick={()=>deleteMessage(message._id)}>Delete Message</Menu.Item> : ""}
                      <Menu.Item icon={<UilClipboardNotes />} onClick={() => copyToClipboard(message.text)}>Clipboard</Menu.Item>
                    </Menu>


                  ))
              }
            </div>
            {/* {message.senderId === currentUser && reachMessage? <UilCheck/>:""}   logic for send confirm message */}
            {/* Chat Sender */}
            <div className="chat-sender">
              <div>
                <button className="button" disabled={true}>+</button>
              </div>
              {/* <button>+</button> */}
              <InputEmoji value={newMessage} onChange={handleChange} onBlur={()=>{onBlur()}} onFocus={()=>{onFocus()}}/>
              <button className="send-button button" disabled={!newMessage} onClick={handleSend}>Send</button>
            </div>
          </>
        ): 
        <span className="chatbox-empty-message">
          Tap on a Chat to Start conversation
        </span>
      }
        
      </div>
    </>
  );
};

export default ChatBox;
