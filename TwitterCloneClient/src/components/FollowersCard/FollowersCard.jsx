import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { getAllUser } from '../../Api/UserRequest'
import User from '../User/User'
import "./FollowersCard.css"
import { LoadingAnimation, ErrorAnimation } from '../LoadingErrorAnimation/LoadingErrorAnimation'

const FollowersCard = () => {
    const [persons, setPersons] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => state.authReducer.authData)
      //it used to test network request failure state

    

    useEffect(() => {
        const fetchPersons = async () => {   
            try {
                setLoading(true)
                const {data}= await getAllUser();
                setPersons(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(true)
                console.log(error)
            }
        }
        fetchPersons();
     
    }, [])
    return (
        <div className="FollowersCard">
            <h3>People You may Know...</h3>
            
            {persons.map((person, id) => {
                if(person._id !== user._id)
                {
                   return  <User person={person} key={id} /> 
                }
                return null;

            })}
            {loading? <LoadingAnimation height={100} width={100} />:error? <ErrorAnimation height={100} width={100}  />:""}
        </div>
    )
}

export default FollowersCard