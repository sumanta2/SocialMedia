import React, { lazy, Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary";
//import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import "./PostSide.css"
import ErrorFallback from '../Fallbacks/ErrorFallBack';
const Posts = lazy(() => import("../Posts/Posts"))

const PostSide = ({ Opened, setOpened }) => {
  return (
    <div className="PostSide">
      <PostShare Opened={Opened} setOpened={setOpened} />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {  }}> 
        <Suspense fallback={<div>Loading...</div>}>
          <Posts profileSide={true} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default PostSide