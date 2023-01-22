import React, { useState, useEffect, useRef } from "react";
import { getUser } from "../../Api/UserRequest";
import { addMessage, getMessages } from "../../Api/MessageRequest";
import {format} from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser ,setSendMessage,receiveMessage}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("");
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
    // console.log("Received message ChatBox1")
    // console.log(receiveMessage)
    // console.log("chat");
    // console.log(chat);
    // console.log( receiveMessage?.chatId);
    // console.log( chat?._id);
    // let obj1="SOrry"
    
    // if(receiveMessage !== null)
    // {
    //   obj1= Object?.keys(receiveMessage)[2]
    //   console.log(receiveMessage[obj1]);
    //   console.log(receiveMessage[obj1] === chat?._id);
    // }

      

    if((receiveMessage !== null)&&(receiveMessage.chatId === chat._id)) {

      setMessages([...messages,receiveMessage])
      // console.log("Received message ChatBox2")
      // console.log(receiveMessage)
    } 


  }, [receiveMessage])
  

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
      const {data}= await addMessage(message);
      setMessages([...messages,data])
      setNewMessage("")
    } catch (error) {
        console.log(error);
    }

    const receiverId=chat.members.find((id) => id !== currentUser);
    setSendMessage({...message,receiverId});
  }


  //always scroll to the last message
  useEffect(() =>{
    scroll.current?.scrollIntoView({behavior:"auto"});  //in place of auto if provided smooth it smoothly scroll beginning to end
  },[messages])

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
                  </div>
                </div>
              </div>
              <hr style={{width:'85%',border:'0.1px solid #ececec'}}/>
            </div>

            {/* Chat Box Messages */}
            <div className="chat-body">
              {
                messages.map((message,no)=> (
                    <div key={no} ref = {scroll}
                    className={message.senderId === currentUser? "message own" :"message"}>
                      <span>{message.text}</span>
                      <span>{format(message.createdAt)}</span>
                    </div>
                ))
              }
            </div>

            {/* Chat Sender */}
            <div className="chat-sender">
              <div>
                <button className="button" disabled={true}>+</button>
              </div>
              {/* <button>+</button> */}
              <InputEmoji value={newMessage} onChange={handleChange}/>
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
