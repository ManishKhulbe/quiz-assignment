import { useEffect, useState } from "react";
import { useQuizProvider } from "../context/QuizProvider";

function StartScreen({ username }) {
  const [language, setLanguage] = useState("");
  let { dispatch, numQuestions } = useQuizProvider();

  useEffect(() => {
    const accessToken = localStorage.getItem("authToken");

    fetch(`http://localhost:5000/index/question/getQuestions?Language=${language}`, {
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
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data.result });
        dispatch({ type: "setExamLang" , payload: language});
      })
      .catch((err) => {
        dispatch({ type: "dataFailed" });
      });
  }, [language]);

  return (
    <div className="start">
      <h3>Hi {username}!</h3>
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>

      {language ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "start" })}
        >
          Let's start
        </button>
      ) : (
        //make a dropdown to select language
        <select
          className="btn btn-ui"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Select Language</option>
          <option value="en">English</option>
          <option value="hn">Hindi</option>
        </select>
      )}
    </div>
  );
}

export default StartScreen;
