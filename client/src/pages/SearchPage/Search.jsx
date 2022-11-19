import React, {useState, useEffect} from 'react'
import "./search.css";

import {useLocation} from "react-router-dom";
import SearchCard from "../../components/SearchCard/SearchCard.jsx";

import axios from "axios";

const Search = () => {

  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(()=> {
    const fetchVideos = async () => {
        const res = await axios.get(`/videos/search${query}`);
        setVideos(res.data);
    }
    fetchVideos();
  }, [query])

  return (
    <div className='search'>
       {videos.map((video)=> (
         <SearchCard key={video._id} video={video}></SearchCard>
       ))}
    </div>
  )
}

export default Search;