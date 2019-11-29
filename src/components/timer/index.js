import React, { useEffect } from "react";
import "./style.css";

function Timer({ time, setTime }) {
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setTime]);
  return <p className="header-board">{time}</p>;
}

export default Timer;
