import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./style.css";

function ScoreBoard(props) {
  const [scoreBoard, setScoreBoard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const response = await Axios.get(
        "http://localhost:3001/" + props.difficulty
      );
      setScoreBoard(response.data);
      setIsLoading(false);
    };
    fetch();
  }, [props.difficulty]);

  if (isLoading === true) {
    return <p>Loading...</p>;
  } else {
    return (
      <div style={{ width: "100%" }}>
        <h4 className="score-board-title">High scores {props.difficulty}</h4>
        <div
          className={`score-board-section ${
            props.difficulty === "experts" ? null : "score-board-separator"
          }`}
        >
          {scoreBoard.map((element, index) => {
            return (
              <div
                className={`score-board-table ${
                  index === 0 ? "score-board-leader-line" : "score-board-line"
                } ${
                  index % 2 === 0
                    ? "background-score-light"
                    : "background-score"
                }`}
                key={index}
              >
                <span>{index + 1}.</span>
                <span>{element.pseudo}</span>
                <span>{element.score + " sec"}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ScoreBoard;
