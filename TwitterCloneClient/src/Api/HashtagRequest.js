import { instance as API } from "./CommonRequests"

export const getAllHashTag = () => API.get(`/hashtag/trending`)

export const getSpecificHashtagAllPost = (hashtag) => API.get(`/hashtag/tag/${hashtag}`)
