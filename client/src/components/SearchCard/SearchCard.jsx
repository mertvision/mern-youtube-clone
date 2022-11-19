import React, {useState,useEffect } from 'react';
import "./searchCard.css";

import axios from "axios";
import {Link} from "react-router-dom";
import {format} from "timeago.js"

const SearchCard = ({video}) => {
    const [channel, setChannel] = useState();
    useEffect(()=> {
        const getChannel = async () => {
            const channelRes = await axios.get(`users/find/${video.userId}`);
            setChannel(channelRes.data);
        }
        getChannel()
    }, [channel]);
  
    return (
        <div className="channelCard">
          <Link
            to={`/video/${video._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img className="channelCardImg" src={video.imgUrl} alt="" />
            <div className="channelCardDetails">
              <img
                className="channelCardChannelImg"
                src="" /*channel.profile_image*/
                alt=""
              />
              <div className="channelCardTexts">
                <h1 className="channelCardTitle">{video.title}</h1>
                <h2 className="channelCardChannelName">{}</h2>
                <div className="channelCardInfo">
                  {video.views} views • {format(video.createdAt)}
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
}

export default SearchCard