import React, { lazy, Suspense } from 'react'
//import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import './ProfileSide.css'
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from '../Fallbacks/ErrorFallBack'
const FollowersCard = lazy(() => import('../FollowersCard/FollowersCard'))

const ProfileSide = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard location="homepage" />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}> 
        <Suspense fallback={<div>Loading...</div>}>
          <FollowersCard />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default ProfileSide