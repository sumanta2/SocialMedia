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