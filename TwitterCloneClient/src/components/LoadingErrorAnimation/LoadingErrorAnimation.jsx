import React from 'react'
import LottieRenderer from '../LottieRenderer/LottieRenderer'
import LottieLoaderAnimation from "../../img/animation/9764-loader.json"
import LottieErrorAnimation from "../../img/animation/4386-connection-error.json"
import { useSelector } from 'react-redux'


export const LoadingAnimation = ({height,width}) => {
    return (
        <div style={{ margin: "0px auto" }}>

            <LottieRenderer animationData={LottieLoaderAnimation} height={height} width={width} loop={true} autoplay={true} />
            <span style={{ margin: "1rem", fontWeight: "600", color: "var(--video)" }}>
                Loading...
            </span>

        </div>
    )
}



export const ErrorAnimation = ({ height, width }) => {
  const { animationRepeatType } = useSelector((state) => state.settingsReducer.Animation)
    
    return (
        <div style={{ margin: "0px auto" }}>

            <LottieRenderer animationData={LottieErrorAnimation} height={height} width={width} loop={animationRepeatType === 'loop' ? true : false} autoplay={animationRepeatType === 'one' || animationRepeatType === 'loop' ? true : false} />
            <span style={{ margin: "2rem", fontWeight: "600", color:"#ff0000" }}>
                Error
            </span>

        </div>
    )
}