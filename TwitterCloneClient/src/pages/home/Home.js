import React,{useState} from 'react'
import { useMediaQuery } from '@mantine/hooks';
import { Drawer,ScrollArea } from '@mantine/core';
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profieSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'

const Home = () => {

  const matches = useMediaQuery('(min-width: 678px)');
  const [Opened, setOpened] = useState(false)
  return (
    <div className='Home'>
        {matches?<ProfileSide/>:""}
        <PostSide Opened={Opened} setOpened={setOpened}/>
        {matches?<RightSide/>:""}
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
              <RightSide/>
            </ScrollArea>
        </Drawer>
    </div>
  )
}

export default Home