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
        const message= await PostApi.deletePost(id,userId)
        dispatch({type:"DELETE_SUCCESS",id:id})
    } catch (error) {
        console.log(error)
        dispatch({type:"DELETE_FAILED"})

    }
}