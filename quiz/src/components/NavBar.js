import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ active }) => {
  const username = localStorage.getItem("username");
  const handleLogOutUser = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="navbar-container">
      <Link to="/quiz" className="navbar-link">
        <span
          className={`navbar-item ${
            active === "quiz" ? "navbar-link-active" : ""
          } `}
        >
          quiz
        </span>
      </Link>
      <Link to="/profile" className="navbar-link">
        <div className="user">
          <img
            src="http://pluspng.com/img-png/user-png-icon-big-image-png-2240.png"
            alt="User Avatar"
            className="user-avatar"
          />
          <span
            className={`navbar-item ${
              active === "profile" ? "navbar-link-active" : ""
            } `}
          >
            {username}
          </span>
        </div>
      </Link>
      {username ? (
        <Link to="/" className="navbar-link">
          <span onClick={handleLogOutUser} className="navbar-item">
            logout
          </span>
        </Link>
      ) : (
        <Link to="/" className="navbar-link">
          <span className="navbar-item">login</span>
        </Link>
      )}
    </div>
  );
};

export default NavBar;
