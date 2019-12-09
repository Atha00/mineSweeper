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
      <div>
        <h4>Meilleurs scores {props.difficulty}</h4>
        {scoreBoard.map((element, index) => {
          return (
            <div className="score-board-table" key={index}>
              <span>{element.pseudo}</span>
              <span>{element.score}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ScoreBoard;
