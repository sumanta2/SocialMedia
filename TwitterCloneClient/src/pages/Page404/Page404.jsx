import React from 'react'
import "./Page404.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from "../../img/home.png"
import animation404 from "../../img/animation/98642-error-404.json"
import LottieRenderer from '../../components/LottieRenderer/LottieRenderer'


const Page404 = () => {
  const { animationRepeatType } = useSelector((state) => state.settingsReducer.Animation) 

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
      <LottieRenderer animationData={animation404} height={400} width={400} loop={animationRepeatType==='loop'?true:false} autoplay={animationRepeatType==='one' || animationRepeatType==='loop' ?true:false}/>
      </div>
    </div>
  )
}

export default Page404