import React from 'react'
import Home from "../../img/home.png"
import Noti from "../../img/noti.png"
import Comment from "../../img/comment.png"
import {UilSetting} from "@iconscout/react-unicons"
import "./NavIcons.css"
import {Link} from 'react-router-dom'


const NavIcons = () => {
  return (
    <div className="navIcons">
        <Link to="../home">
        <img src={Home} alt="" />
        </Link>

        <Link to="../settings">
          <UilSetting/>
        </Link>

        <Link to="../notification">
          <img src={Noti} alt="" />
        </Link>

        <Link to="../chat">
        <img src={Comment} alt="" />
        </Link>
    </div>
  )
}

export default NavIcons