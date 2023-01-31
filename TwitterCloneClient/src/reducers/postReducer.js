const postReducer=(
    state={posts:[],loading:false,error:false,uploading:false},
    action)=>{
            switch(action.type){
                case "UPLOAD_START":  
                    return {...state,uploading:true,error:false}
                case "UPLOAD_SUCCESS":

                    return {...state, posts:[action.data,...state.posts],uploading:false,error:false}
                case "UPLOAD_FAIL":
                    return {...state,uploading:false,error:true}
                case "RETREIVING_START":
                    return { ...state, loading: true, error: false };
                case "RETREIVING_SUCCESS":
                    return { ...state, posts: action.data, loading: false, error: false };
                case "RETREIVING_FAIL":
                    return { ...state, loading: false, error: true };
                case "DELETE_START":
                    return { ...state, loading: true, error: false };
                case "DELETE_SUCCESS":
                    return { ...state, posts: state.posts.filter((post)=>post._id !==action.id), loading: false, error: false };
                case "DELETE_FAILED":
                    return { ...state, loading: false, error: true };
                
                case "LIKE_SUCCESS":
                    return { 
                        ...state, 
                        posts: state.posts.map(post => {
                            if (post._id === action.id) {
                                return { ...post, likes: [...post.likes, action.userId] };
                            }
                            return post;
                        }),
                        loading: false,
                        error: false
                    };
                case "UNLIKE_SUCCESS":
                    return { 
                        ...state, 
                        posts: state.posts.map(post => {
                            if (post._id === action.id) {
                                return { ...post, likes: post.likes.filter(like => like !== action.userId) };
                            }
                            return post;
                        }),
                        loading: false,
                        error: true
                    };
                case "LOG_OUT":
                    return {...state,posts:[],uploading:false,error:false}
                default:
                    return state
            }
    }

export default postReducer
