import React, {useState, useEffect} from "react";
import "./comment.css";

import axios from "axios";
import {format} from "timeago.js";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import CommentIcon from '@mui/icons-material/Comment';

const Comment = ({comment}) => {
  const [commentChannel, setCommentChannel] = useState({});

  useEffect(()=> {
    const fetchCommentChannel = async () => {
      const channelRes = await axios.get(`/users/find/${comment.userId}`);
      setCommentChannel(channelRes.data);
    };
    fetchCommentChannel(); 
  }, [])

  return (
    <div className="comment">

      <div className="commentImageContainer">
        <img className="commentImage" src={commentChannel.profile_image} alt="" />
      </div>

      <div className="commentInfosContainer">

        <div className="commentInfosUsername">
          <span className="commentUsername">{commentChannel.name}</span>
          <span className="commentCreatedAt">{format(comment.createdAt)}</span>
        </div>

        <div className="commentInfosText">
          <span className="commentText">{comment.desc}</span>
        </div>

        <div className="commentInfosBottom">
            
            <div className="commentInfosBottomLikes">
              <ThumbUpOffAltIcon style={{fontSize: "20px", cursor:"pointer"}}/>
              <span>Likes</span>
            </div>
   
            <div className="commentInfosBottomDisslikes">
              <ThumbDownOffAltIcon style={{fontSize: "20px", cursor:"pointer"}} />
            </div>

            <div className="commentInfosBottomOk">
              <div className="commentInfosBottomOkAgain">
                <CommentIcon style={{fontSize: "15px", cursor: "pointer"}}/>
                <span style={{fontSize: "15px", cursor: "pointer"}}>Add Comment</span>
              </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Comment;
