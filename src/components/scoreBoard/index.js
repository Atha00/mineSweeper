import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./style.css";

function ScoreBoard() {
  const [scoreBoard, setScoreBoard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const response = await Axios.get("http://localhost:3001/beginners");
      setScoreBoard(response.data);
      setIsLoading(false);
    };
    fetch();
  }, []);

  if (isLoading === true) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        {scoreBoard.map((element, index) => {
          return (
            <div key={index}>
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
