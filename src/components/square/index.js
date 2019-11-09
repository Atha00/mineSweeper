import React from "react";
import "./style.css";

function Square(props) {
  const renderingClick = (value, clicked) => {
    return clicked === "revealed" ? value : null;
  };
  return (
    <button
      className={
        props.clicked === "revealed"
          ? `square-revealed`
          : props.clicked === "locked"
          ? `square-locked`
          : `square-hide`
      }
      onClick={() => {
        props.onClickSquare(props.index);
      }}
      onContextMenu={event => {
        event.preventDefault();
        props.onRightClickSquare(props.index);
      }}
    >
      {renderingClick(props.value, props.clicked)}
    </button>
  );
}

export default Square;
