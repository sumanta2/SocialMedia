import * as HashTagAPI from "../Api/HashTagRequest"


export const getHashTagPosts= (hashtag)=> async(dispatch)=>{
    dispatch({type:"RETREIVING_START"})
    try{
        const {data}= await HashTagAPI.getHashTagPosts(hashtag);   //here it return blank array if no post present
        
        dispatch({type:"RETREIVING_SUCCESS",data:data})
    } 
    catch(error)
    {
        dispatch({type:"RETREIVING_FAIL"})
        console.log(error)
    }
}


// posts: state.posts.filter((post)=>post._id === action.id).likes.includes(action.userId)?state.posts.filter((post)=>post._id === action.id).likes.filter(id=>id!==action.userId):state.posts.filter((post)=>post._id === action.id).likes=[...state.posts.filter((post)=>post._id === action.id).likes,action.userId]

// case "LIKE_SUCCESS":
    //     return { ...state, posts:[...state.posts?.filter((post)=>post._id !==action.id),{...state.posts?.filter((post)=>post._id ===action.id),likes:[...state.posts.filter((post)=>post._id ===action.id)?.likes,action.userId]}], loading: false, error: false };

// case "UNLIKE_SUCCESS":
    //     return { ...state,posts:[...state.posts.filter((post)=>post._id !==action.id),{...state.posts.filter((post)=>post._id ===action.id),likes:[...state.posts.filter((post)=>post._id ===action.id).likes.filter((like)=> like !==action.userId)]}], loading: false, error: true };