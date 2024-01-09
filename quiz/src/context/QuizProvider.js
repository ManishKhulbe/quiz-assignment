import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  //loading , error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
  examLang: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":{
      return { ...state, questions: action.payload, status: "ready" };

    }
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "preStart":
      return {
        ...state,
        status: "preStart",
      };
    case "setExamLang":
      return {
        ...state,
        examLang: action.payload,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("unknown action");
  }
}

function QuizProvider({ children }) {
  const [
    { status, questions, index, answer, points, highScore, secondsRemaining,examLang },
    dispatch
  ] = useReducer(reducer, initialState);
  let numQuestions;
  let maxPossiblePoints;
  useEffect(() => {
    const accessToken = localStorage.getItem("authToken");
    if(accessToken){
      dispatch({type: "preStart"});
      return;
    }
   
  }, []);



  if(questions.length > 0){
    numQuestions = questions.length;
    maxPossiblePoints = questions.reduce((acc, question) => {
      return acc + question.points;
    }, 0);
  }

  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
        examLang
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizProvider() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("value is not available in given context");
  return context;
}

export { useQuizProvider, QuizProvider };
