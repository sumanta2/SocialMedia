import React,{useEffect,useState} from 'react'
import "./TrendCard.css"
import {getAllHashTag} from "../../Api/HashtagRequest"
//import { TrendData } from '../../Data/TrendData'
import { LoadingAnimation, ErrorAnimation } from '../LoadingErrorAnimation/LoadingErrorAnimation'



const TrendCard = ({setShowTrendingPost}) => {
  const [allHashTag, setAllHashTag] = useState([])
  const [loadingError, setLoadingError] = useState({loading:false,error:false})
  const formatter = new Intl.NumberFormat(undefined, { notation: "compact", })

  //it used to test network request failure state
  // const tester = () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       reject('Failed');
  //     }, 2000);
  //   });
  // };


  useEffect(async () => {
    const fetchHashtags = async () => {
      try {
        setLoadingError({...loadingError, loading:true})
        const { data } = await getAllHashTag();
        setLoadingError({...loadingError, loading:false})
        setAllHashTag(data)
      } catch (error) {
        setLoadingError({loading:false,error:true})
        console.log(error)
      }
    }
    fetchHashtags()
  }, [])

  const storeTrend = (trendText) => {
    
    setShowTrendingPost(trendText)
  }
   
   
  return (
    <div className="TrendCard">
      {loadingError.loading ? <LoadingAnimation height={100} width={100} />: loadingError.error ? <ErrorAnimation height={100} width={100}  />: <h3 className='heading'>Trends For You</h3>}
      {allHashTag.map((trend, id) => {
          return (
            <div className="trend" key={id} onClick={()=> storeTrend(trend._id)}>
              <span>#{trend._id}</span>
              <span>#{formatter.format(trend.count)} shares</span>
            </div>
          )
        })}
    </div>
  )
}

export default TrendCard