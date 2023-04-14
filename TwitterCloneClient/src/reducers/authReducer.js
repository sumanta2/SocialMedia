const authReducer= (state={authData : null,loading:false,error:false,postId:null},action)=>{
    switch(action.type)
    {
        case "AUTH_START":
            return {...state,loading:true,error:false}
        case "AUTH_SUCCESS":
            localStorage.setItem("profile",JSON.stringify({...action?.data}))
            return {...state,authData:action.data,loading:false,error:false,postId:action.postId }
        case "AUTH_FAIL":
            return {...state,loading:false,error:true }
        case "LOG_OUT":
            localStorage.clear()
            return {...state, authData:null,loading:false,error:false,postId:null}
        case "UPDATING_START":
            return {...state,updateLoading:true,error:false}
        case "UPDATING_SUCCESS":
            localStorage.setItem("profile",JSON.stringify({...action?.data}))
            return {...state,authData:action.data,updateLoading:false,error:false}
        case "UPDATING_FAIL":
            return {...state,updateLoading:false,error:true}
        
        case "FOLLOW_USER":
            return {...state,authData:{...state.authData,user:{...state.authData.user,following:[...state.authData.user.following,action.data]}}}
        case "UNFOLLOW_USER":
            return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following.filter((personId) => personId !== action.data)] } } }
        case "ADD_POST_ID":
            return { ...state, postId: action.postId }
        case "REMOVE_POST_ID":
            return { ...state, postId: null }
        default:
            return state
            
    }
}

export default authReducer