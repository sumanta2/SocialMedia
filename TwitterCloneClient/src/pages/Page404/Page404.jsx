import React from 'react'
import "./Page404.css"
import image404 from "../../img/004.jpg"
import { Link } from 'react-router-dom'
import Home from "../../img/home.png"


const Page404 = () => {
  return (
    <div className="parentDiv">
      <div>
        <h1>OOPS! page Not Found</h1>
      </div>


      <div className='btnContainer'> 
        <Link className="link" to="../home">
          <img src={Home} alt="" />  
          <span className="home">Home</span>
        </Link>
      </div>


      <div className='imageContainer'>
          <img className='image'  src={image404} alt="not found" />
      </div>
    </div>
  )
}

export default Page404