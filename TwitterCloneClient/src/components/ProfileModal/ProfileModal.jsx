import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import {uploadImage} from "../../Actions/uploadAction";
import { updateUser } from '../../Actions/userAction';
import "./ProfileModal.css"
import { useMediaQuery } from '@mantine/hooks';


function ProfileModal({modalOpened,setModalOpened,data}) {
  const theme = useMantineTheme();
  const {password,...other}=data;

  const [formData, setFormData] = useState(other)
  const [profileImage,setProfileImage]=useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const dispatch=useDispatch()
  const param = useParams()
  
  const screenSize = useMediaQuery('(min-width: 500px)');
  // const {user}=useSelector((state)=>state.authReducer.authData)
  // console.log(other)

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const onImageChange=(event)=>{
    if (event.target.files && event.target.files[0])
      {
        const img=event.target.files[0]
        event.target.name === "profileImage" ? setProfileImage(img):setCoverImage(img)
      }
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    let UserData= formData;
    if(profileImage){
      const data = new FormData()
      const fileName=Date.now()+profileImage.name
      data.append("name",fileName)
      data.append("file",profileImage)
      UserData.profilePicture=fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
          console.log(error)
      }
    }
    if(coverImage){
      const data = new FormData()
      const fileName=Date.now()+coverImage.name
      data.append("name",fileName)
      data.append("file",coverImage)
      UserData.coverPicture=fileName
      try {
        dispatch(uploadImage(data))
      } catch (error) {
          console.log(error)
      }
    }
    dispatch(updateUser(param.id,UserData))
    setModalOpened(false)
  }

  return (
    <Modal style={{ display: "flex" }}
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size={screenSize?"55%":"95%"}
      opened={modalOpened}
      onClose={()=>setModalOpened(false)}
    >
        <form  className="infoFrom">
            <h3>Your info</h3>
            <div>
                <input type="text" className="infoInput" name="firstname" placeholder="First Name" onChange={handleChange} value={formData.firstname}/>
                <input type="text" className="infoInput" name="lastname" placeholder="Last Name" onChange={handleChange} value={formData.lastname}/>
            </div>
            <div>
            <input type="text" className="infoInput" name="worksAt" placeholder="Works At" onChange={handleChange} value={formData.worksAt}/>
            </div>
            <div>
                <input type="text" className="infoInput" name="livesin" placeholder="Lives in" onChange={handleChange} value={formData.livesin}/>
                <input type="text" className="infoInput" name="country" placeholder="Country" onChange={handleChange} value={formData.country}/>
            </div>
            <div>
            <input type="text" className="infoInput" name="relationship" placeholder="Relationship Status" onChange={handleChange} value={formData.relationship}/>
            </div>
            <div>
                Profile Image 
                <input type="file" name="profileImage" onChange={onImageChange}/>
                Cover Image
                <input type="file" name="coverImage" onChange={onImageChange}/>
            </div>
            <button className="button infoButton" onClick={handleSubmit}>Update</button>
        </form>
    </Modal>
  );
}
export default ProfileModal
