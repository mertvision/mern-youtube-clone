import React, { useState, useEffect } from "react";
import "./channel.css";

import ChannelCard from "../../components/ChannelCard/ChannelCard.jsx";
import axios from "axios";
import {useLocation, Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Channel = () => {
  const {currentUser} = useSelector((state) => state.user);

  const [channel, setChannel] = useState({});
  const [videos, setVideos] = useState([]);

  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const fetchChannelDatas = async () => {
      try {
        const channelRes = await axios.get(`/users/find/${path}`);
        setChannel(channelRes.data);

        const videoRes = await axios.get(`/videos/find/byuser/${path}`);
        setVideos(videoRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchChannelDatas();
  }, []);

  return (
    <div className="specialChannel">
      <div className="channelTopContainer">
        <div className="channelTopTop">
          <div className="channelPersonContainer">
            <img
              className="channelPersonImg"
              src={channel.profile_image}
              alt=""
            />
            <span className="channelPersonName">{channel.name}</span>
          </div>

          {currentUser ? (
            <div className="channelButtonContainer">
              <button className="channelButton">Customize Your Channel</button>
            </div>
          ) : (
            <div className="channelButtonContainer">
              <Link to="/signin">
                <button className="channelButton">Subscribe</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {currentUser ? (
        <div className="channelBottomVideosTitle">
          <span>Your Videos</span>
        </div>
      ) : (
        <div className="channelBottomVideosTitle">
          <span>{channel.name}'s Videos</span>
        </div>
      )}

      <div className="channelVideos">
        {videos.map((video) => (
          <ChannelCard key={video._id} video={video} channel={channel} />
        ))}
      </div>
    </div>
  );
}

export default Channel;
