import React from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import axios from "axios";
import Landing from "./Landing";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showSignup, setShowSignup] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submit", email, password);
    // Assume a successful API call for login
    try {
      const sendData = await axios.post(
        "http://localhost:5000/index/user/logIn",
        {
          email: email,
          password: password,
        }
      );
      console.log("🚀 ~ file: Login.js:27 ~ handleSubmit ~ sendData:", sendData)
      alert("Login successfully");
      // Store access token in local storage and name of user
      setIsLoggedIn(true);
      localStorage.setItem("authToken", sendData.data.AccessToken);
      localStorage.setItem("username", sendData.data.UserInfo.UserName);

      // // Redirect to /quiz page
      // navigate("/quiz");
    } catch (e) {
      console.error(e.message);
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = (value) => {
    setShowSignup(value);
  };

  return isLoggedIn ? (
    <Landing />
  ) : (
    <div className="app">
      {showSignup ? (
        <Signup handleSignUp={handleSignUp} />
      ) : (
        <div className="container">
          <h1>Log in</h1>
          <form onSubmit={handleSubmit} className="form">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div className="flexed-div">
              <button className="btn" type="submit">
                Log in
              </button>
              <button
                onClick={() => handleSignUp(true)}
                className="btn"
                type="button"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
