export const LoginStart = (user) =>({
    type: "LOGIN_START"
})

export const LoginSuccess = (user) =>({
    type: "LOGIN_SUCCESS",
    payload: user
})

export const LoginFailed = (error) =>({
    type: "LOGIN_FAILED",
    payload: error
})

export const Follow = (userId) =>({
    type: "FOLLOW",
    payload: userId
})

export const Unfollow = (userId) =>({
    type: "UNFOLLOW",
    payload: userId
})

export const IsAuthenticated = (user) => ({
    type: "IS_AUTHENTICATED",
    payload: user
})