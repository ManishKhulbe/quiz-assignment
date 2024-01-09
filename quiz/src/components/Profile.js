// Profile.js

import React, { useState } from "react";
import NavBar from "./NavBar";
import LeaderBoard from "./LeaderBoard";

const Profile = () => {
  const [resetQuiz, setResetQuiz] = useState(false);
  const handleResetQuiz = () => {

    const accessToken = localStorage.getItem("authToken");

    fetch(`http://localhost:5000/index/result/resetResult`, {
      method: "DELETE",
      headers: {
        accesstoken: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setResetQuiz(true);
        alert("Quiz Reset Successfully");
      })
      .catch((err) => {});
  };

  return (
    <div className="profile-container">
      <NavBar active="profile" />
      <button className="btn" onClick={handleResetQuiz}>
        Reset Quiz
      </button>
      <LeaderBoard useFor={'profile'} />
    </div>
  );
};

export default Profile;
