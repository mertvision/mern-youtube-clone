import React, {useState, useEffect} from "react";
import "./signup.css";
import logo from "../../assets/logo.png";

import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useSelector} from "react-redux";

const SignUp = () => {
  const {currentUser} = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      if (currentUser) {
        navigate("/");
      }
    };
    checkAuth();
  }, []);

  const toastOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "ligth",
  };

  const errorToastOptions = {
    className: "toast-position",
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    type: "default",
    theme: "ligth",
  };

  const handleValidation = async () => {
    if (name === "") {
      toast.error("Please provide a name", errorToastOptions);
    } else if (name.length < 3) {
      toast.error("Please provide a longer name", errorToastOptions);
    } else if (email === "") {
      toast.error("Please provide an email", errorToastOptions);
    } else if (email.length < 5) {
      toast.error("Please provide a longer name", errorToastOptions);
    } else if (password === "") {
      toast.error("Please provide an password", errorToastOptions);
    } else if (confirmPassword === "") {
      toast.error("Please provide confirm password.", errorToastOptions);
    } else if (password !== confirmPassword) {
      toast.error("Passwords will be same", errorToastOptions);
    }
  };

  const createUser = async () => {
    if (handleValidation) {
      try {
        await axios.post(`/auth/signup`, {
          name,
          email,
          password,
        });
        toast.info("Process is successful", toastOptions);
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      } catch (err) {
        toast.error("Error! Check your informations.", errorToastOptions);
      }
    }
  };

  return (
    <div className="signup">
      <img className="signupLogo" src={logo} alt="" />

      <div className="signupWrapper">
        <h1 className="signupWrapperTitle">Sign Up</h1>

        <input
          onChange={(event) => {
            const name = event.target.value;
            setName(name);
          }}
          className="signupWrapperInput"
          type="name"
          placeholder="Name"
        ></input>

        <input
          onChange={(event) => {
            const email = event.target.value;
            setEmail(email);
          }}
          className="signupWrapperInput"
          type="email"
          placeholder="E-mail"
        ></input>

        <input
          onChange={(event) => {
            const password = event.target.value;
            setPassword(password);
          }}
          className="signupWrapperInput"
          type="password"
          placeholder="Password"
        ></input>

        <input
          onChange={(event) => {
            const confirmPassword = event.target.value;
            setConfirmPassword(confirmPassword);
          }}
          className="signupWrapperInput"
          type="password"
          placeholder="Confirm Password"
        ></input>

        <button
          className="signupWrapperButton"
          type="submit"
          onClick={createUser}
        >
          Sign Up
        </button>

        <span className="signupWrapperText">Have you an account?</span>
        <Link
          to="/signin"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontSize: "16px",
          }}
        >
          Sign In
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
