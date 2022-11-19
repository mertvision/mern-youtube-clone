import React from "react";
import "./channelCard.css";

import axios from "axios";
import {Link} from "react-router-dom";
import {format} from "timeago.js";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useSelector} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

const ChannelCard = ({ video, channel }) => {
  const {currentUser} = useSelector((state) => state.user);

  const deleteVideo = async () => {
    await axios
      .delete(`/videos/${video._id}`)
      .then(() => {
        toast.info("Video has been deleted!", toastOptions);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toastOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "ligth",
  };

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
            src={channel.profile_image}
            alt=""
          />
          <div className="channelCardTexts">
            <h1 className="channelCardTitle">{video.title}</h1>
            <h2 className="channelCardChannelName">{channel.name}</h2>
            <div className="channelCardInfo">
              {video.views} views • {format(video.createdAt)}
            </div>
          </div>
        </div>
      </Link>
      {currentUser && currentUser._id === channel._id ? (
        <div className="deleteVideo">
          <button onClick={deleteVideo} className="deleteVideoButton">
            <DeleteIcon style={{ fill: "red" }} />
            Delete This Video ({video.title})
          </button>
        </div>
      ) : (
        <></>
      )}
      <ToastContainer />
    </div>
  );
};

export default ChannelCard;
