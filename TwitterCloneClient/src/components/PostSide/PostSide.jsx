import React, { lazy, Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary";
//import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import "./PostSide.css"
import ErrorFallback from '../Fallbacks/ErrorFallBack';
import { LoadingAnimation } from '../LoadingErrorAnimation/LoadingErrorAnimation'

const Posts = lazy(() => import("../Posts/Posts"))
const TrendPosts = lazy(() => import("../TrendPosts/TrendPosts"))

const PostSide = ({ Opened, setOpened, showTrendingPost, setShowTrendingPost }) => {
  return (
    <div className="PostSide">
      <PostShare Opened={Opened} setOpened={setOpened} />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {  }}> 
        <Suspense fallback={<LoadingAnimation height={100} width={100} />}>
          {showTrendingPost ? <TrendPosts showTrendingPost={ showTrendingPost} setShowTrendingPost={setShowTrendingPost} /> : <Posts />}
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default PostSide