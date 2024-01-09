import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuizProvider } from "../context/QuizProvider";
import NavBar from "./NavBar";
import { useEffect } from "react";

function Landing() {
  const username = localStorage.getItem("username");
  const { status } = useQuizProvider();

  return (
    <>
      <NavBar active={"quiz"} />
      <div className="app">
        <Header username={username} />
        <Main>
          {status === "preStart" && <StartScreen username={username} />}
          {status === "ready" && <StartScreen username={username} />}
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "active" && (
            <>
              <Progress />
              <Question />
              <Footer>
                <Timer />
                <NextButton />
              </Footer>
            </>
          )}
          {status === "finished" && <FinishScreen />}
        </Main>
      </div>
    </>
  );
}

export default Landing;
