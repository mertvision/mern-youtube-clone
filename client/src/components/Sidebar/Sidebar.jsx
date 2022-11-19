import React from "react";
import "./sidebar.css";

import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HistoryIcon from '@mui/icons-material/History';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const Sidebar = () => {
    const {currentUser} = useSelector(state=> state.user);

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">

                {currentUser ? (
                <div className="user" style={{display:"flex", alignItems:"center", gap:"10px", }}>

                <Link to={`channel/${currentUser._id}`} style={{color:"inherit", textDecorationColor:"none", marginBottom:"10px"}}>
                  <img className="userImage" style={{height:"40px", width:"40px", objectFit:"cover", borderRadius:"50%", cursor:"pointer"}} src={currentUser.profile_image} alt=""/>
                </Link>
                <h3 className="userName" style={{fontSize:"17px", fontWeight:"500", cursor:"pointer", marginBottom:"10px"}}>{currentUser.name}</h3>
              
                </div>
                ) : 
                (<></>)
                }

                <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
                <div className="sidebarWrapperItem">
                    <HomeIcon style={{fill: "#3ea6ff"}} />
                    Home
                </div>
                </Link>

                <Link to="trends" style={{textDecoration:"none", color:"inherit"}}>
                <div className="sidebarWrapperItem">
                    <ExploreIcon style={{fill: "#3ea6ff"}} />
                    Explore
                </div>
                </Link>
             
             
                <div className="sidebarWrapperItem">
                    <AppShortcutIcon style={{fill: "#3ea6ff"}} />
                    Shorts
                </div>
            
                {currentUser ? 
                (<Link to="subscriptions" style={{textDecoration:"none", color:"inherit"}}>
                <div className="sidebarWrapperItem">
                    <SubscriptionsIcon style={{fill: "#3ea6ff"}} />
                    Subscriptions
                </div>
                </Link>) 
                : 
                (<></>)}
                
                <hr className="sidebarHr"></hr>

                <div className="sidebarWrapperItem">
                    <LibraryBooksIcon style={{fill: "#3ea6ff"}} />
                    Books
                </div>

                <div className="sidebarWrapperItem">
                    <HistoryIcon style={{fill: "#3ea6ff"}} />
                    History
                </div>

                <hr className="sidebarHr"></hr>

                {currentUser 
                ? 
                (
                    <Link to="create/video" style={{textDecoration:"none", color: "inherit"}}>
                    <button style={{
                        display:"flex", 
                        alignItems:"center",
                        gap:"10px",
                        margin: "10px 0px",
                        padding:"10px",
                        backgroundColor:"transparent",
                        border:"1px solid #373737",
                        fontSize:"15px",
                        cursor:"pointer"
                        }}>
                        <VideoCallIcon />
                        Add Video
                    </button>
                    </Link>
                ) 
                :
                <Link to="/signin" style={{textDecoration:"none", color:"inherit"}}>
                <div className="sidebarSignIn">
                    <span className="sidebarSignInText">Sign in to like, share and comment videos.</span>
                    <button className="sidebarSignInButton">
                        <HomeIcon style={{fill: "#3ea6ff"}} />
                        Sign In
                    </button>
                </div>
                </Link>
                }

                <div className="sidebarWrapperItem">
                    <AudiotrackIcon style={{fill: "#3ea6ff"}} />
                    Music
                </div>

                <div className="sidebarWrapperItem">
                    <SportsVolleyballIcon style={{fill: "#3ea6ff"}} />
                    Sports
                </div>

                <div className="sidebarWrapperItem">
                    <SportsEsportsIcon style={{fill: "#3ea6ff"}} />
                    Games
                </div>

                <div className="sidebarWrapperItem">
                    <LiveTvIcon style={{fill: "#3ea6ff"}} />
                    Live
                </div>

                <hr className="sidebarHr"></hr>

                <div className="sidebarWrapperItemBold">
                    <ControlPointIcon style={{fill: "white"}} />
                    Look at Channels
                </div>

                <hr className="sidebarHr"></hr>

                <span className="sidebarWrapperItemBold">Much More of Youtube</span>

                <div className="sidebarYoutubeSpecial">
                    <div className="sidebarYoutubeSpecialItem">
                        <YouTubeIcon style={{ fill: "red"}}/>
                        Youtube Premium
                    </div>

                    <div className="sidebarYoutubeSpecialItem">
                        <YouTubeIcon style={{ fill: "red"}} />
                        Youtube Music
                    </div>

                    <div className="sidebarYoutubeSpecialItem">
                        <YouTubeIcon style={{ fill: "red" }} />
                        Youtube Kids
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Sidebar;