import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function UnPrivateRoute(props) {
            
    const {user} = useContext(AuthContext);
    if(user){
        return <Navigate replace to="/" />
    }

    return props.children
}
