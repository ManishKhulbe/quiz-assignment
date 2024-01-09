import React, { useEffect, useState } from "react";
import { useQuizProvider } from "../context/QuizProvider";

const LeaderBoard = ({ useFor }) => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const { examLang } = useQuizProvider();

  useEffect(() => {
    const accessToken = localStorage.getItem("authToken");
    let apiUrl = `http://localhost:5000/index/result/getResult?Language=${examLang}`;
    if (useFor === "profile")
      apiUrl = `http://localhost:5000/index/result/getResult`;

    fetch(apiUrl, {
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
        setLeaderBoard(res.data);
      })
      .catch((err) => {});
  }, [examLang, useFor]);

  return (
    <div>
      <h2>LeaderBoard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>userId</th>
            <th>UserName</th>
            <th>language</th>
            <th>Max Points</th>
            <th>Percentage</th>
            <th>Points</th>
            <th>Quiz Given</th>
          </tr>
        </thead>
        <tbody>
          {leaderBoard?.map((entry, index) => (
            <tr key={index}>
              <td>{entry.userId}</td>
              <td>{entry.userName}</td>
              <td>{entry.language}</td>
              <td>{entry.maxPossiblePoints}</td>
              <td>{Number(entry.percentage).toFixed(2)}</td>
              <td>{entry.points}</td>
              <td>{entry.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
