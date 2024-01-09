import { useState } from "react";
import { useQuizProvider } from "../context/QuizProvider";
import LeaderBoard from "./LeaderBoard";

function FinishScreen() {
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const { points, maxPossiblePoints, highScore, dispatch } = useQuizProvider();
  const percentage = (points / maxPossiblePoints) * 100;

  const handleShowLeaderBoard = (show) => {
    setShowLeaderBoard(show);
  };

  

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";


  if (showLeaderBoard) {
    return (
      <>
         <LeaderBoard
        handleShowLeaderBoard={handleShowLeaderBoard}
        percentage={percentage}
      />
      <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart Quiz
        </button>
      </>
   
    );
  }
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints}( {Math.ceil(percentage)}%)
      </p>
      <p className="highscore"> highScore: {highScore} points </p>
      <div className="flexed-div">
        <button
          className="btn btn-ui"
          onClick={() => handleShowLeaderBoard(true)}
        >
          LeaderBoard
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart Quiz
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
