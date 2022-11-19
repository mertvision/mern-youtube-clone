import React, {useState, useEffect} from 'react';
import "./home.css";

import Card from "../../components/Card/Card.jsx";
import axios from "axios";

const Home = ({type}) => {
  const [videos, setVideos] = useState([]);

  useEffect(()=> {
      const fetchVideos = async () => {
        const res = await axios.get(`videos/${type}`);
        setVideos(res.data);
      }
      fetchVideos();
  }, [type])

  return (
    <div className='home'>
       {videos.map(video=> (
        <Card key={video._id} video={video}></Card>
       ))}
    </div>
  )
}

export default Home;