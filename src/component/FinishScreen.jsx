import { Fragment } from "react";

function FinishScreen({ maxPossiblePoints, points, highscore, dispatch }) {
  const pers = (points / maxPossiblePoints) * 100;

  let emoji;

  if (pers === 100) emoji = "🥇";
  if (pers >= 80 && pers < 100) emoji = "🔥";
  if (pers >= 50 && pers < 80) emoji = "😁";
  if (pers >= 0 && pers < 50) emoji = "😔";
  if (pers === 0) emoji = "😭";
  return (
    <Fragment>
      <p className="result">
        <span>{emoji}</span> you finished this quiz with score{" "}
        <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(pers)}
        %)
      </p>
      <p className="highscore">(highScore : {highscore} points)</p>
      <button
        className="btn btn-ui "
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </Fragment>
  );
}

export default FinishScreen;
