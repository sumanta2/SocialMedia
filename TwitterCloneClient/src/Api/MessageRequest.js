// import axios from "axios";

// const API = axios.create({baseURL:process.env.REACT_APP_BASE_URL})

import { instance as API } from "./CommonRequests"


export const getMessages=(id)=> API.get(`/message/${id}`);

export const addMessage= (data)=> API.post("/message/",data)

export const deleteMessages = (id) => API.delete(`/message/${id}`)

export const deleteOneMessage = (id) => API.delete(`/message/oneMsg/${id}`)