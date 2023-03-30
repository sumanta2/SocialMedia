import React,{useEffect,useState} from 'react'
import "./TrendCard.css"
import {getAllHashTag} from "../../Api/HashtagRequest"
//import { TrendData } from '../../Data/TrendData'

const TrendCard = ({setShowTrendingPost}) => {
  const [allHashTag, setAllHashTag] = useState([])
  const [loadingError, setLoadingError] = useState({loading:false,error:false})
  const formatter = new Intl.NumberFormat(undefined, { notation: "compact", })

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
      {loadingError.loading? "Loading...":loadingError.error?"Failed to Fetch data...":<h3>Trends For You</h3>}
        {allHashTag.map((trend,id)=>{
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