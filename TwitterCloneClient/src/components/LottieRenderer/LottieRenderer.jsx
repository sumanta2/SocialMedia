import Lottie from "lottie-react"

const LottieRenderer=({animationData,height,width,loop,autoplay})=> {
  
  return (
    <div style={{ height: height, width: width}}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}      
      />
    </div>
  );
}

export default LottieRenderer;