import React from "react";

import "./index.css";

function SuccessScreen({ name, time, score }) {
  return (
    <div className="success-screen">
      <h1>Game is Finished!</h1>
      <p>score: {score}</p>
      <p>Time taken: {time}</p>
      <p>Thanks for playing {name}!</p>
    </div>
  );
}

export default SuccessScreen;
