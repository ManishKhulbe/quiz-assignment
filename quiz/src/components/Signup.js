import React from "react";
import axios from "axios";

const Signup = ({ handleSignUp }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    //api call suppose successfull
    console.log("submit", name, email, password);

    try {
      const sendData = await axios.post(
        "http://localhost:5000/index/user/signUp",
        {
          UserName: name,
          email: email,
          password: password,
        }
      );
      console.log(sendData);
      alert("User added successfully");
      //back to login screen
      handleSignUp(false);
    } catch (e) {
      console.error(e.message);
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>SignUp or Register</h1>
        <form onSubmit={handleSubmit} className="form">
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            className="input"
            type="name"
            id="email"
            value={name}
            onChange={handleNameChange}
          />
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
              Sign up
            </button>
            <button
              onClick={() => handleSignUp(false)}
              className="btn"
              type="submit"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
