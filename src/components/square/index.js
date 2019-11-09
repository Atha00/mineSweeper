import React from "react";
import "./style.css";

function Square(props) {
  const renderingClick = (value, clicked) => {
    return clicked ? value : null;
  };
  return (
    <button
      className={props.clicked ? `square-clicked` : `square-unclicked`}
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
