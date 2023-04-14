// Here with redux I used Redux_thunk package
import * as AuthApi from "../Api/AuthRequest"

export const logIn= (formData,postId,)=> async (dispatch) =>{
    dispatch({type:"AUTH_START"})
    try {
    const {data}= await AuthApi.logIn(formData)
        dispatch({ type: "AUTH_SUCCESS", data: data,postId:postId })
    } catch (error) {
        console.log(error)
        dispatch({type:"AUTH_FAIL"})
    }
}


export const signUp= (formData,postId,)=> async (dispatch) =>{
    dispatch({type:"AUTH_START"})
    try {
    const {data}= await AuthApi.signUp(formData)    //error here
    //console.log(data)
    dispatch({type:"AUTH_SUCCESS",data:data,postId:postId})
    } catch (error) {
        console.log(error)
        dispatch({type:"AUTH_FAIL"})
    }
}

export const addPostId = (postId)=>(dispatch) => {
    dispatch({ type: "ADD_POST_ID", postId: postId })
}

export const removePostId = () => (dispatch) => {
    dispatch({ type: "REMOVE_POST_ID"})
}

export const logOut = () => async (dispatch)=>{
    dispatch({type: "LOG_OUT"})
}