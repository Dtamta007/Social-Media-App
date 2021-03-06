const AuthReducer = (state,action) =>{
    switch(action.type){
        case "LOGIN_START" : 
            return{
                user : null,
                isFetching: true,
                error : false
            };

        case "LOGIN_SUCCESS" : 
            return{
                user : action.payload,
                isFetching: false,
                error : false
            };

        case "LOGIN_FAILED" : 
            return{
                user : null,
                isFetching: false,
                error : action.payload
            };
        case "FOLLOW" : 
            return{
                ...state,
                user: {
                    ...state.user,
                    following:[...state.user.following, action.payload]
                }
            };
        case "UNFOLLOW" :
            return{
                ...state,
                user: {
                    ...state.user,
                    following: state.user.following.filter((followingUser) => followingUser !== action.payload)
                }
            };
        case "IS_AUTHENTICATED" :
            return{
                user: action.payload,
                isFetching: false,
                error: false
            };
        default : 
            return state;
    }
}

export default AuthReducer;