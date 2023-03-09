import axios from "axios"
const API=axios.create({baseURL:process.env.REACT_APP_BASE_URL})


export const getHashTagPosts = (id)=>API.get(`/hashtag/${id}`)

// in case of delete request we need to pass the data inside the body key to pass data through body
