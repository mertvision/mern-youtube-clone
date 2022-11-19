import React from "react";
import "./app.css";

import Topbar from "./components/Topbar/Topbar.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";

import Home from "./pages/HomePage/Home.jsx";
import Search from "./pages/SearchPage/Search.jsx";
import SignIn from "./pages/SignInPage/SignIn.jsx";
import SignUp from "./pages/SignUpPage/SignUp.jsx";
import Video from "./pages/VideoPage/Video.jsx";
import AddVideo from "./pages/AddVideoPage/AddVideo.jsx";
import Channel from "./pages/ChannelPage/Channel.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Topbar />
      <div className="mainWrapper">
        <Sidebar />
        <div className="wrapper">
          <Routes>
            <Route path="/">
              <Route index element={<Home type="random" />} />
              <Route path="trends" element={<Home type="trends" />} />
              <Route path="subscriptions" element={<Home type="sub" />} />
              <Route path="search" element={<Search />}></Route>
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />

              <Route path="video">
                <Route path=":id" element={<Video />} />
              </Route>

              <Route path="channel">
                <Route path=":id" element={<Channel />} />
              </Route>

              <Route path="create">
                <Route path="video" element={<AddVideo />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
