import axios from 'axios';
const API=axios.create({baseURL:process.env.REACT_APP_BASE_URL})

export const userChats=(id)=> API.get(`/chat/${id}`)

export const createChat=(following,user)=> API.post(`/chat`,
{
    "senderId":user,
    "receiverId":following
  })

  export const deleteChat=(id)=> API.delete(`/chat/${id}`)