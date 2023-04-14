// import axios from "axios"
import { instance as API } from "./CommonRequests"


// const API=axios.create({baseURL:process.env.REACT_APP_BASE_URL})

export const getOnePosts = (id) => API.get(`/post/${id}`)

export const getSpecificUserPosts = (id) => API.get(`/post/all/${id}`)

export const getTimelinePosts= (id)=>API.get(`/post/${id}/timeline`)

export const likePost= (id,userId)=>API.put(`post/${id}/like`,{userId:userId})

export const deletePost=(id,userId)=>API.delete(`/post/${id}`,{data:{userId:userId}})    

// in case of delete request we need to pass the data inside the body key to pass data through body
