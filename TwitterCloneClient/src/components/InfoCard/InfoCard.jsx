import React,{useState,useEffect} from 'react'
import "./InfoCard.css"
import { UilPen,UilClipboardNotes,UilShare,UilWhatsapp } from "@iconscout/react-unicons"
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch,useSelector } from 'react-redux'
import {useParams } from "react-router-dom"
import * as UserApi from '../../Api/UserRequest.js'
import { logOut } from '../../Actions/AuthAction'
import { Menu } from '@mantine/core';
import Share from "../../img/share.png"



const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false)
    const dispatch= useDispatch()
    const params= useParams()
    const profileUserId= params.id
    const [profileUser, setProfileUser] = useState({})
    const [fetchError, setFetchError] = useState(false)
    const { user } = useSelector((state) => state.authReducer.authData)   
  const { notificationDuration, notificationOn } = useSelector((state) => state.settingsReducer.Notification)

    
    useEffect(() => {
      const fetchProfileUser= async ()=>{
        if(profileUserId === user._id)
        {
            setProfileUser(user)
        }
        else {
            try {
                const {data}= await UserApi.getUser(profileUserId)
                setProfileUser(data)
            } catch (error) {
                setFetchError(true)
                console.log(error)
            }
            
        }
        }
        
      fetchProfileUser()
    }, [user,profileUserId])

    const handleLogOut= ()=>{
        dispatch(logOut())
    }

    const copyToClipboard = async () => {
        const link = process.env.REACT_APP_LOCALHOST_URL+"/profile/"+profileUserId;
        try {
          await navigator.clipboard.writeText(link);
          { notificationOn && toast.success('Link Copied', { duration: parseInt(notificationDuration) }); }
        }
        catch (error) {
          console.error("Failed to copy text: ", error);
        }
      }
    
      const shareToWhatsapp = () => {
          const link = process.env.REACT_APP_LOCALHOST_URL + "/profile/" + profileUserId;
        const encodedMessage = encodeURIComponent(link);
        window.open(`whatsapp://send?text=${encodedMessage}`);
      }


    return (
        <div className={`${fetchError? "InfoCardError":"InfoCard"}`}>
          <div className="infoHead">
            <h4>Profile Info</h4>
          <div style={{"display":"flex","gap":".5rem"}}>
            {
              user._id === profileUserId ? (
                <div>

                  <UilPen width="2rem" height="1.2rem" onClick={() => { setModalOpened(true) }} />
                  <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
                </div>
              ) : ("")
            }
            {/* <Menu control={<img src={Share} height="20px" alt="" style={{ "cursor": "pointer", "marginRight": "10px" }} />}> */}
            <Menu control={<span ><UilShare width="2rem" height="1.2rem" /></span>}>
              <Menu.Label >Share</Menu.Label>
              <Menu.Item icon={<UilClipboardNotes />} onClick={copyToClipboard}>Clipboard</Menu.Item>
              <Menu.Item icon={<UilWhatsapp color="#00FF5F" />} onClick={shareToWhatsapp}>Whatsapp</Menu.Item>
            </Menu>
          </div> 
            </div>
        {!fetchError?
          (<><div className="info">
          <span>
            <b>status </b>
          </span>
          <span>{profileUser?.relationship?? "--"}</span>
        </div>

          <div className="info">
            <span>
              <b>Lives in </b>
            </span>
            <span>{profileUser.livesin?? "--"}</span>
          </div>

          <div className="info">
            <span>
              <b>Works at </b>
            </span>
            <span>{profileUser.worksAt ?? "--"}</span>
            </div>
          </>):<span className='fetchError'>Data Not Found</span>}

            <button className="button logout-button" onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default InfoCard