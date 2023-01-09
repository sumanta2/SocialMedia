import axios from "axios"
const API=axios.create({baseURL:"http://localhost:5000"})
//here formData indicate the body part of Post API request
export const uploadImage=(data)=> API.post("/upload/",data)

export const uploadPost = (data)=> API.post("/post",data)