import React, { useContext } from 'react'
import "./topbar.css";
import {Search, Chat, Notifications, Person, ExitToApp} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios';

export default function Topbar() {

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleClick = async() =>{
      await axios.get('/auth/logout');
      window.location.reload();
    }

    return (
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Socially</span>
          </Link>
        </div>
        <div className="topbarMid">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input placeholder="Search on Socially" className="searchInput" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <ExitToApp onClick={handleClick}/>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "/person/noAvatar.png"
              }
              alt=""
              className="topbarImage"
            />
          </Link>
          {/* <button className="logout" onClick={handleLogout}>Logout</button> */}
        </div>
      </div>
    );
}
