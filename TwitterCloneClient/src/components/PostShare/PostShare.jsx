import React, {useState,useRef} from 'react'
import "./PostShare.css"
import { useMediaQuery } from '@mantine/hooks';
import ProfileImage from "../../img/profileImg.jpg"
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons"
import { UilSchedule } from "@iconscout/react-unicons"
import { UilTimes } from "@iconscout/react-unicons"
import { UilBars } from '@iconscout/react-unicons'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uploadImage,uploadPost } from '../../Actions/uploadAction';


const PostShare = ({Opened,setOpened}) => {
    const loading=useSelector((state)=>state.postReducer.uploading)
    const [image,setImage]=useState(null)
    const imageRef=useRef()
    const desc=useRef()
    const matches = useMediaQuery('(min-width: 723px)');
    const matches1 = useMediaQuery('(min-width: 487px)');
    
    const dispatch=useDispatch()
    const serverPublic= process.env.REACT_APP_PUBLIC_FOLDER
    const {user}=useSelector((state)=>state.authReducer.authData)
    const onImageChange= (event)=>{
            if(event.target.files && event.target.files[0])
            {
                let img=event.target.files[0]
                setImage(img)
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
    }
    return (
        <div className="PostShare">
            <img src={user.profilePicture? serverPublic+user.profilePicture:serverPublic+"defaultProfile.png"} alt="" />
            <div>
                <input type="text" ref={desc} required name="" id="" placeholder="What's Happening" />

                <div className="postOptions">
                    {/* setOpened(false) */}
                    {matches?"":(
                        <div className="option" style={{alignSelf:"left"}} onClick={handleClick}>
                            <UilBars  />
                        </div>
                        //previous 3 line or next 3 line
                        // <div className="option" style={{alignSelf:"left"}} >
                        //     <UilBars  />
                        // </div>
                        
                    )}
                    <div className="option" style={{color:"var(--photo)"}} onClick={()=>{imageRef.current.click()}}>
                        <UilScenery />
                        {matches1?"Photo":""}
                    </div>
                    <div className="option" style={{color:"var(--video)"}}>
                        <UilPlayCircle />
                        {matches1?"Video":""}
                    </div>
                    <div className="option" style={{color:"var(--location)"}}>
                        <UilLocationPoint />
                        {matches1?"Location":""}
                    </div>
                    <div className="option" style={{color:"var(--shedule)"}}>
                        <UilSchedule />
                        {matches1?"Schedule":""}
                    </div>
                    <button className='button ps-button' disabled={loading}
                    onClick={handleSubmit}>
                        {loading? "Uploading...":"Share"}
                        </button>
                    <div style={{display:"none"}}>
                        <input type="file" name="myImg" ref={imageRef} onChange={onImageChange}/>
                    </div>
                </div>
                {image && (
                    <div className="previewImage">
                        <UilTimes onClick={()=>{setImage(null)}}/>
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostShare