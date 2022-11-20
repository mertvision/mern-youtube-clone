import React, {useState, useEffect} from 'react';
import "./signin.css";
import logo from "../../assets/logo.png"
import axios from "axios";


import {Link, useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"

import {loginStart, loginSuccess, loginFailure} from "../../redux/userSlice.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {

  const {currentUser} = useSelector(state=> state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=> {
    const checkAuth = async () => {
      if(currentUser){
        navigate("/")
      }
    }
    checkAuth();

  }, [currentUser]);
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginToastOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "ligth",
  };

  const loginErrorToastOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    type: "default",
    theme: "ligth",
  };

  const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
          const res = await axios.post("auth/signin", {
            email,
            password
          });
          dispatch(loginSuccess(res.data))
          toast.info("Process is successful", loginToastOptions)
          setTimeout(()=> {
            navigate("/");
          }, 3500);
          
        }
        catch(err){
          dispatch(loginFailure());
          toast.error("Error! Check your informations.", loginErrorToastOptions)
        }
  };

  return (
    <div className='signin'>
      
       <img className='signinLogo' src={logo} alt='' />
      
       <div className='signinWrapper'>
           <h1 className='signinWrapperTitle'>Sign In</h1>

           <input onChange={(e)=> setEmail(e.target.value)}
            className='signinWrapperInput'
            type="email"
            placeholder='E-mail'>
            
           </input>

           <input onChange={(e)=> setPassword(e.target.value)}
            className='signinWrapperInput'
            type="password"
            placeholder='Password'>
           </input>

           <button onClick={handleLogin} className='signinWrapperButton'>Sign In</button>

           <span style={{marginTop:"5px"}}>or</span>

           <span className='signinWrapperText'>Don't you have an account?</span>
           <Link to="/signup" style={{textDecoration: "none", color:"inherit", fontSize:"16px"}}>Sign Up</Link>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignIn;