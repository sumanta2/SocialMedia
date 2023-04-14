import React,{useState,useEffect} from 'react'
import "./ProfileCard.css"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { getUser } from '../../Api/UserRequest.js'
import { getSpecificUserPosts } from '../../Api/PostRequest'



const ProfileCard = ({location}) => {  

  const {user}=useSelector((state)=>state.authReducer.authData)

  const posts = useSelector((state) => state.postReducer.posts)
  const params = useParams()
  const profileUserId = params.id
  const [profileUser, setProfileUser] = useState({})
  const [userPosts, setUserPosts] = useState([])
  

  useEffect(() => {
    const fetchProfileUser= async ()=>{
      if(profileUserId === user._id || location === "homepage")
      {
        setProfileUser(user)
        setUserPosts(posts)
      }
      else {
        try {
          const { data } = await getUser(profileUserId)
          const { data: postData } = await getSpecificUserPosts(profileUserId)
          setProfileUser(data)
          setUserPosts(postData)
        } catch (error) {
          console.log(error)
        }
        
      }
    }
  
    fetchProfileUser()
  }, [user,profileUserId])
  
  // const ProfilePage=false
  const serverPublic= process.env.REACT_APP_PUBLIC_FOLDER
  
  return (
    <div className='ProfileCard'>
      <div className="ProfileImages">
        <img src={profileUser.coverPicture? serverPublic+profileUser.coverPicture:serverPublic+"defaultCover.jpg"} alt="" />
        <img src={profileUser.profilePicture? serverPublic+profileUser.profilePicture:serverPublic+"defaultProfile.png"} alt="" />
      </div>
      <div className="ProfileName">
        <span>{profileUser.firstname} {profileUser.lastname}</span>
        <span>{profileUser.worksAt? profileUser.worksAt: "Write about Yourself..."}</span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{profileUser.following?.length ?? "--"}</span>
            <span>Following</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{profileUser.followers?.length ?? "--"}</span>
            <span>Followers</span>
          </div>
          {
            location=== "profilePage" && (
              <>
                  <div className="vl">

                  </div>
                  <div className="follow">
                    <span>{profileUserId === user._id? userPosts?.filter((post)=>post.userId === user._id).length :userPosts?.length}</span> 
                    <span>Posts</span>
                  </div>

              </>
            )
          }
        </div>
        <hr />
      </div>
      {location=== "profilePage" ? "" :<span>
        <Link style={{textDecoration:"none",color:"inherit"}} to={`/profile/${user._id}`}>  My Profile </Link>
        </span>}
      
    </div>
  )
}

export default ProfileCard