import {axiosInstance} from "../../config";
import { useRef } from "react";
import "./register.css";
import {Link, useNavigate} from 'react-router-dom'

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirm = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(password.current.value !== confirm.current.value){
            confirm.current.setCustomValidity("Passwords don't match!")
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password : password.current.value
            };
            try{
                await axiosInstance.post("/auth/register", user);
                navigate("/login");
            }catch(err){
                console.log(err);
            }
        }


    }
    
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
              <input
                type="text"
                placeholder="Username"
                className="loginInput"
                ref={username}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="loginInput"
                ref={email}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="loginInput"
                ref={password}
                minLength="8"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="loginInput"
                ref={confirm}
                required
              />
              <button className="loginButton" type="submit">Sign up</button>
              <Link className="loginRegisterButtonLink" to={"/login"}>
                <button className="loginRegisterButton">
                  Log into your account
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
}
