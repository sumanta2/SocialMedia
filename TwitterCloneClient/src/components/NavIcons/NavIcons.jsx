import React from 'react'
// import Home from "../../img/home.png"
// import Noti from "../../img/noti.png"
// import Comment from "../../img/comment.png"
// import {UilSetting} from "@iconscout/react-unicons"
import "./NavIcons.css"
import { Link , useLocation } from 'react-router-dom'
import LottieRenderer from '../LottieRenderer/LottieRenderer';
import ChatAnimation from "../../img/animation/97844-chat-2022.json"
import SettingAnimation from "../../img/animation/86419-settings.json"
import NotificationAnimation from "../../img/animation/99861-notification-bell.json"
import HomeAnimation from "../../img/animation/136176-simple-home.json"
import ChatImage from "../../img/ChatImage.png"
import NotificationImage from "../../img/NotificationImage.png"
import SettingImage from "../../img/SettingImage.png"
import HomeImage from "../../img/HomeImage.png"



const NavIcons = () => {
  const location = useLocation();
  return (
    <div className="navIcons">
        <Link to="../home">
        {location.pathname === "/home" ? <LottieRenderer animationData={HomeAnimation} height={32} width={38} loop={false} autoplay={true} />
        :<img src={HomeImage} alt="" style={{height:"30px",width:"33px",padding:"4px 2px 2px 2px"}} />  }
        </Link>

        <Link to="../settings">
        {location.pathname==="/settings" ?<div style={{paddingTop:"4px"}}> <LottieRenderer  animationData={SettingAnimation} height={30} width={30} loop={false} autoplay={true}/></div>: <img src={SettingImage} alt="" style={{height:"26px",width:"26px",paddingTop:"6px"}} /> }
        </Link>

        <Link to="../notification" style={{transform:"translate(0px, -4px)"}}>
        {location.pathname === "/notification" ?<LottieRenderer animationData={NotificationAnimation} height={40} width={45} loop={false} autoplay={true} />
          :<img src={NotificationImage} alt="" style={{height:"29px",width:"24px",left:"-2px",paddingTop:"9px",position:"relative",margin:"0px 12px"}} /> }
        </Link>

        <Link to="../chat" className='chatClass'>
        {location.pathname === "/chat" ?<LottieRenderer animationData={ChatAnimation} height={34} width={75} loop={false} autoplay={true} />
          :<img src={ChatImage} alt="" style={{height:"26px",width:"48px",padding:"4px 13px 0px 15px"}} /> }
        </Link>
    </div>
  )
}

export default NavIcons