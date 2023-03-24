import React from 'react'
import Logo from '../../img/logo.png'
import {UilSearch} from '@iconscout/react-unicons'
import "./LogoSearch.css"

const LogoSearch = () => {
  return (
    <div className='LogoSearch'>
        <img src={Logo} alt=""/>
        <div className="Search">
            {/* <input type="text" placeholder="#Explore" />
            <div className="s-icon">
                <UilSearch/>
            </div> */}
        <span className='appName'>Twitter</span>
        </div>
    </div>
  )
}

export default LogoSearch