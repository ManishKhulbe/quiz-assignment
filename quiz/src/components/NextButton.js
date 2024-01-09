import { useQuizProvider } from "../context/QuizProvider";
import axios from "axios";

function NextButton() {
  const { dispatch, answer, examLang } = useQuizProvider();
  const { points, maxPossiblePoints , index , numQuestions} = useQuizProvider();
  const percentage = (points / maxPossiblePoints) * 100;
  async function handleFinish() {
    try {
      const accessToken = localStorage.getItem("authToken");

      const sendData = await axios.post(
        "http://localhost:5000/index/result/addResult",
        {
          percentage,
          points,
          maxPossiblePoints,
          examLang

        },
        {
          headers: {
            accesstoken: `Bearer ${accessToken}`,
          },
        }
      );

      alert("Score added successfully");
    } catch (e) {
      console.error(e.message);
    }

    dispatch({ type: "finish" });
  }
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
    if (index === numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={handleFinish}>
        Finish
      </button>
    );
}

export default NextButton;
