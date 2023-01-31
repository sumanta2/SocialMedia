import Lottie from "react-lottie"

const LottieRenderer=({animationData,height,width,loop,autoplay})=> {
  const defaultOptions = {
      loop: loop,
      autoplay: autoplay,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  
  return (
    <div>
      <Lottie 
	    options={defaultOptions}
        height={height}
        width={width}
      />
    </div>
  );
}

export default LottieRenderer;