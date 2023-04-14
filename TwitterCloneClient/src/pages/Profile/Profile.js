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
  const matches1 = useMediaQuery('(min-width: 962px)');

  const [CheckOpened, setCheckOpened] = useState(false)
  const [showTrendingPost, setShowTrendingPost] = useState(null)

  


  return (
    <div className="Profile">
      {matches?<ProfileLeft setShowTrendingPost={setShowTrendingPost} />:""}
        
        
        <div className="Profile-center">
            <ProfileCard location="profilePage"/>
            <PostSide Opened={CheckOpened} showTrendingPost={showTrendingPost} setShowTrendingPost={setShowTrendingPost} setOpened={setCheckOpened} />
        </div>
        
      {matches1 ? <RightSide setShowTrendingPost={setShowTrendingPost} /> : ""}
      
      
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
            <RightSide setShowTrendingPost={setShowTrendingPost} />
          </ScrollArea>
      </Drawer>


    </div>
  )
}

export default Profile