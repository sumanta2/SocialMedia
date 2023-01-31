import * as PostApi from "../Api/PostRequest"


export const getTimelinePosts= (id)=> async(dispatch)=>{
    dispatch({type:"RETREIVING_START"})
    try{
        const {data}= await PostApi.getTimelinePosts(id);   //here it return blank array if no post present
        
        dispatch({type:"RETREIVING_SUCCESS",data:data})
    } 
    catch(error)
    {
        dispatch({type:"RETREIVING_FAIL"})
        console.log(error)
    }
}


export const deletePost= (id,userId)=> async(dispatch)=>{  //"id" is the post Id which post will be deleted and "userId" means the user who currently log in
    try {
        dispatch({type:"DELETE_START"})
         await PostApi.deletePost(id,userId)
        dispatch({type:"DELETE_SUCCESS",id:id})
    } catch (error) {
        console.log(error)
        dispatch({type:"DELETE_FAILED"})
    }
}

export const likeUnlikePost= (data,userId)=> async(dispatch)=>{  //"id" is the post details which post will be liked or unlike and "userId" means the user who currently log in
    const exist=data.likes.includes(userId)
    try {
        if(exist)
        {
            dispatch({type:"UNLIKE_SUCCESS",id:data._id,userId:userId})
             await PostApi.likePost(data._id,userId)
        }
        else
        {
            await PostApi.likePost(data._id,userId)
            dispatch({type:"LIKE_SUCCESS",id:data._id,userId:userId})

        }
    } catch (error) 
    {
        console.log(error)
        if(exist)
        {
            dispatch({type:"LIKE_SUCCESS",id:data._id,userId:userId})
        }
        else
        {
            dispatch({type:"UNLIKE_SUCCESS",id:data._id,userId:userId})
        }

    }
}

// posts: state.posts.filter((post)=>post._id === action.id).likes.includes(action.userId)?state.posts.filter((post)=>post._id === action.id).likes.filter(id=>id!==action.userId):state.posts.filter((post)=>post._id === action.id).likes=[...state.posts.filter((post)=>post._id === action.id).likes,action.userId]

// case "LIKE_SUCCESS":
    //     return { ...state, posts:[...state.posts?.filter((post)=>post._id !==action.id),{...state.posts?.filter((post)=>post._id ===action.id),likes:[...state.posts.filter((post)=>post._id ===action.id)?.likes,action.userId]}], loading: false, error: false };

// case "UNLIKE_SUCCESS":
    //     return { ...state,posts:[...state.posts.filter((post)=>post._id !==action.id),{...state.posts.filter((post)=>post._id ===action.id),likes:[...state.posts.filter((post)=>post._id ===action.id).likes.filter((like)=> like !==action.userId)]}], loading: false, error: true };