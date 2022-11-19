import React, { useState, useEffect } from "react";
import "./addVideo.css";

import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useSelector} from "react-redux";

const AddVideo = () => {
  
  const navigate = useNavigate();
  const {currentUser} = useSelector(state => state.user);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [videoPreview, setVideoPreview] = useState();
  
  useEffect(() => {
    const checkAddVideoAuth = async () => {
      if (!currentUser && currentUser === null) {
        navigate("/")
      };
    };
    checkAddVideoAuth();
  }, [currentUser]);

  const beingProcessedVideoOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "ligth",
  };

  const anErrorOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "ligth",
  };

  const send = async () => {
    const data = new FormData();

    data.append("title", title);
    data.append("description", description);
    data.append("image", image);
    data.append("file", file);

    const res = await axios.post('/videos/', data)
    if(res.status === 200 && res.statusText){
       toast.info("Video is being processed, will be uploaded shortly.", beingProcessedVideoOptions);
       setTimeout(()=> {
          navigate('/')
       }, 6500)
    }
    else if(res.status !== 200){
       toast.error("Something went wrong.", anErrorOptions)
    }
  }

  return (
    <div className='file-upload'>
    <div className='file-upload-wrapper'>
        <h1 className='file-upload-text'>Upload File</h1>

        <form action="#">
            <label>Video Name:</label>
            <input
                className='file-upload-input'
                type="text"
                name="title"
                id=""
                onChange={event=> {
                    const title = event.target.value;
                    setTitle(title);
                }}
                placeholder='File Name'>
            </input>

            <label style={{marginTop: "5px"}}>Video Description:</label>
            <input
                className='file-upload-input'
                type="text"
                name="description"
                id=""
                onChange={event=> {
                    const description = event.target.value;
                    setDescription(description);
                }}
                placeholder='File Description'>
            </input>
 
            <label>Video Image:</label>
            <input
                className='file-upload-input'
                type="file"
                name="image"
                id=""
                accept='.jpg, .jpeg, .png'
                onChange={event => {
                    const image = event.target.files[0];
                    setImage(image);
                    setImagePreview(URL.createObjectURL(event.target.files[0]))
                }}
                placeholder='Image'>
            </input>

            Video File:
            <input
                className='file-upload-input'
                type="file"
                name="file"
                id=""
                accept='.mp4'
                onChange={event => {
                    const file = event.target.files[0];
                    setFile(file);
                    setVideoPreview(URL.createObjectURL(event.target.files[0]))
                }}
                placeholder='File'>
            </input>
        </form>

        <div className="uploadedFiles">
          <div className="uploadedImage">
            Your Video Image:
            <img src={imagePreview} alt="" className="uploadedImagePreview"/>
          </div>
   
          <div className="uploadedVideo">
              Your Video:
             <iframe src={videoPreview} frameborder="0" className="uploaded-video" width={"250px"}></iframe>
          </div>
        </div>

        <button className='file-upload-button' onClick={send}>Upload</button>

    </div>
    <ToastContainer />
</div>
  )
};

export default AddVideo;