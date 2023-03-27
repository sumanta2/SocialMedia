

export const updateNotificationSetting = (data) => (dispatch) => {
    
    dispatch({type:"UPDATE_NOTIFICATION_START",data:data})
}

export const updateAnimationSetting = (data) => (dispatch)=> {
    dispatch({ type: "UPDATE_ANIMATION_START", data: data })
}