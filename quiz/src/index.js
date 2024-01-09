import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { QuizProvider } from "./context/QuizProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Landing from "./components/Landing";
import PrivateRoute from "./components/utils/PrivateRoute";
import NavBar from "./components/NavBar";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/quiz" element={<PrivateRoute />}>
            <Route path="/quiz" element={<Landing />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </QuizProvider>
  </React.StrictMode>
);
