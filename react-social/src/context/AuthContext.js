import { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import axios from 'axios';

let INITIAL_STATE = {
    user : JSON.parse(localStorage.getItem("auth")) || null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    useEffect(()=>{
        const data = localStorage.getItem('auth');
        if(data)
            state.user = JSON.parse(data);
    },[state]);

    useEffect(()=>{
        const getAuth = () =>{
                axios.get('/authenticated').then(res =>{
                    if(res.status !== 401){
                        const {user} = res.data;
                        const userData = JSON.stringify(user);
                        localStorage.setItem('auth',userData);
                        dispatch({type: "IS_AUTHENTICATED", payload: user});
                    }
                }).catch(err=>{
                    dispatch({type: "LOGIN_FAILED", payload: err})
                });
        }
        getAuth();
    },[]);
    console.log("STATE: ", state);
    return (
        <AuthContext.Provider 
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
            >
                {children}
        </AuthContext.Provider>
    )
}