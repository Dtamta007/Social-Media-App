import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core";
import {Link} from 'react-router-dom';

export default function Login() {

    const username = useRef();
    const password = useRef();
    const {isFetching, dispatch} = useContext(AuthContext);

    const handleSubmit = (e) =>{
        e.preventDefault();
        loginCall({username: username.current.value, password: password.current.value}, dispatch);
    };

    // console.log("IGNORE:", user,error);
    
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Socially</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on socially.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Email/Username" className="loginInput" ref={username} required/>
                        <input type="password" placeholder="Password" className="loginInput" ref={password} minLength="8" required/>
                        <button className="loginButton" disabled={isFetching}>
                            {isFetching ? <CircularProgress color="white" size = "25px"/> : "Log In"}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link to={'/register'} className="loginRegisterButtonLink">
                            <button className="loginRegisterButton" disabled={isFetching}>
                                {isFetching ? <CircularProgress color="white" size = "25px"/> : "Create a New Account"}
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
