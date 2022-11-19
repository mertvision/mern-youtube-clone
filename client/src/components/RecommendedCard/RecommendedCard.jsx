import React, { useState, useEffect } from "react";
import "./recommendedCard.css"

import axios from "axios";
import {useNavigate} from "react-router-dom";
import {format} from "timeago.js";

const RecommendedCard = ({ video }) => {
    const navigate = useNavigate();
    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axios.get(`http://localhost:5000/api/users/find/${video.userId}`);
            setChannel(res.data);
        };
        fetchChannel();
    }, [video.userId]);

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
    }

    return (
        <div className="smallCard" onClick={clickEvents}>

            <img className="smallCardImg" src={video.imgUrl} alt="" />

            <div className="smallCardDetails">

                <img className="smallCardDetailsChannelImg" src={channel.profile_image} alt="" />

                <div className="smallCardDetailsTexts">

                    <h1 className="smallCardDetailsTitle">{video.title}</h1>
                    <h2 className="smallCardDetailsChannelName">{channel.name}</h2>
                    <div className="smallCardDetailsInfo">
                        {video.views} views • {format(video.createdAt)}
                    </div>

                </div>

            </div>

        </div>
    )

};

export default RecommendedCard;