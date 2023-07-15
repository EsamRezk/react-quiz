function FinishScreen({ maxPossiblePoints, points }) {
  const pers = (points / maxPossiblePoints) * 100;
  return (
    <p className="result">
      you finished this quiz with score <strong>{points}</strong> out of{" "}
      {maxPossiblePoints} ({Math.ceil(pers)}%)
    </p>
  );
}

export default FinishScreen;
