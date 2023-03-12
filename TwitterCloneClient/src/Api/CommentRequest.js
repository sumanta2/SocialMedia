// import axios from 'axios';
// const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })

import { instance as API } from "./CommonRequests"


export const createComment = (commentData) => API.post(`/comment`, commentData)

export const getAllComments = (contentId) => API.get(`/comment/${contentId}`)

export const likeUnlikeComment = (commentId, userId) => API.put(`/comment/likes/${commentId}`,{ userId:userId })

export const deleteComment= (commentId) => API.delete(`/comment/${commentId}`)
    


