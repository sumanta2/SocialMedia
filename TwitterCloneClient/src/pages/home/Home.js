import React,{useState} from 'react'
import { useMediaQuery } from '@mantine/hooks';
import { Drawer,ScrollArea } from '@mantine/core';
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
// import { useLocation } from 'react-router-dom';
// import { useSelector } from "react-redux";
// import {io} from "socket.io-client"


const Home = () => {

  const matches = useMediaQuery('(min-width: 723px)');
  const [Opened, setOpened] = useState(false)
  const [showTrendingPost, setShowTrendingPost] = useState(null)




  return (
    <div className='Home'>
        {matches?<ProfileSide/>:""}
      <PostSide Opened={Opened} setOpened={setOpened} showTrendingPost={showTrendingPost} setShowTrendingPost={setShowTrendingPost} />
        {matches?<RightSide setShowTrendingPost={setShowTrendingPost}/>:""}
        <Drawer
            opened={Opened}
            onClose={() => setOpened(false)}
            title=""
            padding="xl"
            size="md"
            // style={{ backgroundColor:"#f3f3f3"}}
            >
            <ScrollArea  className="Home" style={{height:"100%"}}>
              <ProfileSide/>
          <RightSide setShowTrendingPost={setShowTrendingPost} />
            </ScrollArea>
        </Drawer>
    </div>
  )
}

export default Home