import React, { lazy, Suspense } from 'react'
import { useMediaQuery } from '@mantine/hooks';
//import FollowersCard from '../FollowersCard/FollowersCard'
import RightSide from '../RightSide/RightSide';
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from '../Fallbacks/ErrorFallBack';
const FollowersCard = lazy(() => import('../FollowersCard/FollowersCard'))

const ProfileLeft = () => {
  let location=useLocation();
  let dataval=location?.pathname.search("/profile");
  const matches = useMediaQuery('(min-width: 723px)');
  const matches1 = useMediaQuery('(max-width: 942px)');
  return (
    <div >
        <LogoSearch/>
        <InfoCard/>
      
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {  }}> 
        <Suspense fallback={<div>Loading...</div>}>
          <FollowersCard />
        </Suspense>
      </ErrorBoundary>
         {
          dataval!== -1 ? matches1 ? matches?<RightSide/> :"":"":""
        }
    </div>
  )
}

export default ProfileLeft