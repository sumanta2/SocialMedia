import React from 'react'
import { useMediaQuery } from '@mantine/hooks';
import FollowersCard from '../FollowersCard/FollowersCard'
import RightSide from '../RightSide/RightSide';
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import { useLocation } from 'react-router-dom';
const ProfileLeft = () => {
  let location=useLocation();
  let dataval=location?.pathname.search("/profile");
  const matches = useMediaQuery('(min-width: 723px)');
  const matches1 = useMediaQuery('(max-width: 942px)');
  return (
    <div >
        <LogoSearch/>
        <InfoCard/>
        <FollowersCard/>
         {
          dataval!== -1 ? matches1 ? matches?<RightSide/> :"":"":""
        }
    </div>
  )
}

export default ProfileLeft