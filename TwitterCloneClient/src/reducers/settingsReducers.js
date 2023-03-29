const notification = { notificationDirection: 'top-left',notificationDuration: '3000',notificationOn:true};
const animation = { animationRepeatType: 'one'}
const settingsReducer = (state = { Notification: notification, Animation: animation, loading: false, error: false }, action) => { 
    switch (action.type) {
        case "INITIALIZE SETTINGS":
            return { ...state, Notification: notification, Animation: animation }
        case "FETCHING SETTINGS":
            return { ...state, Notification: notification, Animation: animation }
        case "UPDATE_NOTIFICATION_START":
            return { ...state, Notification: action.data, loading: false,error:false }
        case "UPDATE_NOTIFICATION_FAILED":
            return { ...state, Notification: action.data, loading: false, error: true }
        case "UPDATE_ANIMATION_START":
            return { ...state, Animation: action.data, loading: false,error:false }
        case "UPDATE_ANIMATION_FAILED":
            return { ...state, Animation: action.data, loading: false, error: true }
        default:
            //console.log(state)
            return state
    }
}
export default settingsReducer;