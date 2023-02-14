import React,{useState} from 'react'

import PostSide from '../../components/PostSide/PostSide'
import { Drawer,ScrollArea } from '@mantine/core';
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import { useMediaQuery } from '@mantine/hooks';
import "./Profile.css"


const Profile = () => {
  const matches = useMediaQuery('(min-width: 723px)');
  const matches1 = useMediaQuery('(min-width: 942px)');

  const [CheckOpened, setCheckOpened] = useState(false)




  return (
    <div className="Profile">
      {matches?<ProfileLeft/>:""}
        
        
        <div className="Profile-center">
            <ProfileCard location="profilePage"/>
            <PostSide Opened={CheckOpened} setOpened={setCheckOpened} />
        </div>
        
      {matches1?<RightSide/>:""}
      
      {/* <RightSide/> */}
      <Drawer
          opened={CheckOpened}
          onClose={() => setCheckOpened(false)}
          title=""
          padding="xl"
          size="md"
          // style={{ backgroundColor:"#f3f3f3"}}
          >
          <ScrollArea  className="Home" style={{height:"100%"}}>
            <ProfileLeft/>
            <RightSide/>
          </ScrollArea>
      </Drawer>


    </div>
  )
}

export default Profile