import { instance as API } from "./CommonRequests"

export const getAllHashTag = ()=>API.get(`/hashtag/trending`)
