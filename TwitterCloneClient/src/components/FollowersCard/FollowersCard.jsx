import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { getAllUser } from '../../Api/UserRequest'
import User from '../User/User'
import "./FollowersCard.css"
const FollowersCard = () => {
    const [persons, setPersons] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => state.authReducer.authData)

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
            {loading? "  Loading...":error? "Cannot Fetch Data":""}
        </div>
    )
}

export default FollowersCard