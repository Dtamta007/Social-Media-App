import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PrivateRoute({children}) {
    const {user} = useContext(AuthContext);
    console.log("TYPE: ", user);
    if(!user){
        return <Navigate from="/" to="/login" />
    }

    return children;
}
