import React, { useEffect } from "react";
import "./style.css";

function Timer(props) {
  useEffect(() => {
    const interval = setInterval(() => {
      props.setTime(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <p>{props.time}</p>;
}

export default Timer;
