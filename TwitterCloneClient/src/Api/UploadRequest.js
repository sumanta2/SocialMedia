// import axios from "axios"
// const API=axios.create({baseURL:process.env.REACT_APP_BASE_URL})


import { instance as API } from "./CommonRequests"

//here formData indicate the body part of Post API request
export const uploadImage=(data)=> API.post("/upload/",data)

export const uploadPost = (data)=> API.post("/post",data)