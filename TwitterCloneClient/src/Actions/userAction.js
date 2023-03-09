import * as UserApi from "../Api/UserRequest"
import {createChat} from "../Api/ChatRequests";
export const updateUser= (id,formData)=>async(dispatch)=>{
    dispatch({type:"UPDATING_START"})
    try{
        const {data}= await UserApi.updateUser(id,formData);
        dispatch({type:"UPDATING_SUCCESS",data:data})
    }
    catch(error){
        dispatch({type:"UPDATING_FAIL"})
        console.log(error)
    }
}

export const followUser=(id,data)=>async(dispatch)=>{
    dispatch({type:"FOLLOW_USER",data:id})
    try {
        await UserApi.followUser(id,data);
        await createChat(id,data._id);  //id is person id and data is login user data 
        
    } catch (error) {
        dispatch({type:"UNFOLLOW_USER",data:id})
        console.log(error);        
    }
}

export const unFollowUser = (id,data)=> async(dispatch)=>{
    dispatch({type:"UNFOLLOW_USER",data:id})
    try {
         await UserApi.unFollowUser(id,data)
    } catch (error) {
        dispatch({type:"FOLLOW_USER",data:id})
        console.log(error); 
    }
}