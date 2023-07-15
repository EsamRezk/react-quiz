import "../index.css";
import Header from "./Header";
import Main from "./Main";
import { Fragment, useEffect, useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question.jsx";
import NextButton from "./NextButton.jsx";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
const initialstate = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
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
      return { ...state, status: "finished" };
    default:
      break;
  }
}
export default function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialstate
  );
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  const numQuestions = questions.length;
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <Fragment>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </Fragment>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
          />
        )}
      </Main>
    </div>
  );
}
