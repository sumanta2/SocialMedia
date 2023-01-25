import axios from "axios"
const API=axios.create({baseURL:"http://localhost:5000"})


export const getTimelinePosts= (id)=>API.get(`/post/${id}/timeline`)

export const likePost= (id,userId)=>API.put(`post/${id}/like`,{userId:userId})

export const deletePost=(id,userId)=>API.delete(`/post/${id}`,{data:{userId:userId}})    

// in case of delete request we need to pass the data inside the body key to pass data through body
