import React, {useState, useEffect} from "react";
import "./card.css";

import axios from "axios";
import {useNavigate} from "react-router-dom";
import {format} from "timeago.js";

const Card = ({video}) => {
  const [channels, setChannels] = useState({});
  const navigate = useNavigate();

  useEffect(()=> {
      const fetchChannel = async () => {
         const res = await axios.get(`/users/find/${video.userId}`)
         setChannels(res.data);
      }
      fetchChannel();
  }, [video.userId]);

  // Videoya view ekle */
  const addViewVideo = async () => {
       await axios.put(`/videos/view/${video._id}`);
  };

  // Video'nun _id'sine ait bir url yaratıp oraya götür. -> video/ahj31fs1d53ed
  const navigateToVideo = async () => {
        navigate(`/video/${video._id}`);
  };

  const clickEvents = async () => {
    addViewVideo();
    navigateToVideo();
  };

  return (
    <div className="card" onClick={clickEvents} >
        <img className="cardImg" src={video.imgUrl} alt="" />
        <div className="cardDetails">
          <img className="cardDetailsChannelImg" src={channels.profile_image} alt="" />
          <div className="cardDetailsTexts">
            <h1 className="cardDetailsTitle">{video.title}</h1>
            <h2 className="cardDetailsChannelName">{channels.name}</h2>
            <div className="cardDetailsInfo">{video.views} views • {format(video.createdAt)}</div>
          </div>
        </div>
    </div>
  )
};

export default Card;