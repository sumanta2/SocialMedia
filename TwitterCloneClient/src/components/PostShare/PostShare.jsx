import React, {useState,useRef,useEffect} from 'react'
import "./PostShare.css"
import { useMediaQuery } from '@mantine/hooks';
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons"
import { UilTimes } from "@iconscout/react-unicons"
import { UilBars } from '@iconscout/react-unicons'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { uploadImage,uploadPost } from '../../Actions/uploadAction';
import toast from 'react-hot-toast';


const PostShare = ({Opened,setOpened}) => {
    const loading = useSelector((state) => state.postReducer.uploading)
    const {notificationDuration,notificationOn}=useSelector((state) => state.settingsReducer.Notification)
    const [image,setImage]=useState(null)
    const [acceptFileType, setAcceptFileType] = useState({ image: "null", video: null })
    const [disabledShare, setDisabledShare] = useState(false)
    const { id } = useParams();
    const [trackText, setTrackText] = useState("")
    const imageRef=useRef()
    const videoRef=useRef()
    const desc=useRef()
    const matches = useMediaQuery('(min-width: 723px)');
    const matches1 = useMediaQuery('(min-width: 487px)');

    const img=process.env.REACT_APP_IMAGE_EXTENSION.split("-")
    const video=process.env.REACT_APP_VIDEO_EXTENSION.split("-")
  
    var acceptImg=img.map((data) => {return "."+data}).join()
    var acceptVdo=video.map((data) => {return "."+data}).join()
    
    const dispatch=useDispatch()
    const serverPublic= process.env.REACT_APP_PUBLIC_FOLDER
    const { user } = useSelector((state) => state.authReducer.authData)
    
    useEffect(() => {
        if (id && id !== user._id) {
          setDisabledShare(true)
        }
        else {
            setDisabledShare(false)
        }

    }, [id])
    

    const onImageChange= (event)=>{
            const {name}=event.target
            if(event.target.files && event.target.files[0])
            {
                let img1=event.target.files[0]
                setImage(img1)
                const ext= img1?.name.split(".").pop();
                const chkImg= img.includes(ext);
                const chkVdo= video.includes(ext);
                setAcceptFileType({image:chkImg,video:chkVdo})
                if(name !=="myImg" && chkImg) 
                {
                    toast.error('Only mp4,mov,wmv,avi format allowed', {duration: parseInt(notificationDuration)});
                    setImage(null)
                }
                else if(name !=="myVdo" && chkVdo)
                { 
                    setImage(null)
                    toast.error('Only jpg,png,jpeg,gif format allowed', {duration: parseInt(notificationDuration)});
                 }
            }
            
    }
    const handleClick=()=>{
        setOpened(!Opened);
    }
    const reset= ()=>{
        setImage(null)
        desc.current.value=""
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        const newPost={
            userId:user._id,
            desc:desc.current.value,
        }
        setTrackText("")
        if(image)
        {

            const data= new FormData()
            const filename=Date.now()+image.name
            data.append("name",filename)
            data.append("file",image)
            newPost.image=filename
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }
        dispatch(uploadPost(newPost))
        reset()
        { notificationOn && toast.success('Posted', { duration: parseInt(notificationDuration), }); }
    }
    return (
        <div className="PostShare">
            <img src={user.profilePicture? serverPublic+user.profilePicture:serverPublic+"defaultProfile.png"} alt="" />
            <div>
                <input type="text" disabled={disabledShare} ref={desc} required value={trackText} onChange={(e)=>setTrackText(e.target.value)} name="" id="" placeholder="What's Happening" />

                <div className="postOptions">
                    {/* setOpened(false) */}
                    {matches?"":(
                        <div className="option" style={{alignSelf:"left"}} onClick={handleClick}>
                            <UilBars  />
                        </div>
                        
                    )}
                    <div className={`option ${disabledShare? "disabled":"" }`} style={{color:"var(--photo)"}}  onClick={()=>{imageRef.current.click()}}>
                        <UilScenery style={{transform: "rotate(12deg)"}} />
                        {matches1?"Photo":""}
                    </div>
                    <div className={`option ${disabledShare? "disabled":"" }`} style={{color:"var(--video)"}} onClick={()=>{videoRef.current.click()}}>
                        <UilPlayCircle style={{transform: "rotate(10deg)"}} />
                        {matches1?"Video":""}
                    </div>
                    <div className={`option ${disabledShare? "disabled":"" }`} style={{color:"var(--location)"}}>
                        <UilLocationPoint  style={{transform: "rotate(342deg)"}}/>
                        {matches1?"Location":""}
                    </div>
                    {/* <div className="option" style={{color:"var(--shedule)"}}>
                        <UilSchedule style={{transform: "rotate(15deg)"}}/>
                        {matches1?"Schedule":""}
                    </div> */}
                    <button className='button ps-button' disabled={loading || ( !image && !trackText)}   
                    onClick={handleSubmit}>
                        {loading? "Uploading...":"Share"}
                        </button>
                    <div style={{display:"none"}}>
                        <input type="file" name="myImg" accept={acceptImg} ref={imageRef} onChange={onImageChange}/>
                        <input type="file" name="myVdo" accept={acceptVdo} ref={videoRef} onChange={onImageChange}/>
                    </div>
                </div>
                {image && (
                    <div className="previewImage">
                        <UilTimes onClick={()=>{setImage(null)}}/>
                        {  acceptFileType.image?<img src={URL.createObjectURL(image)} alt="" />:"" }

                        { acceptFileType.video?
                                <video controls  style={{maxHeight:"400px",display:"block",boxSizing:"border-box",width:"100%"}}> 
                                    <source src={URL.createObjectURL(image)} type="video/mp4"/>
                                </video>:""
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostShare