import React from "react";
import MineLogo from "../../images/mine.png";
import "./style.css";

function Square(props) {
  const renderingClick = (value, clicked) => {
    return clicked === "revealed" ? (
      value === "M" ? (
        <img src={MineLogo} alt="" />
      ) : (
        value
      )
    ) : null;
  };
  const renderingColor = value => {
    if (value === 1) {
      return "blue";
    } else if (value === 2) {
      return "green";
    } else if (value === 3) {
      return "red";
    } else if (value === 4) {
      return "dark-blue";
    } else if (value === 5) {
      return "brown";
    } else if (value === 6) {
      return "cyan";
    } else if (value === 7) {
      return "purple";
    } else {
      return null;
    }
  };
  return (
    <button
      className={`${renderingColor(props.value)} ${
        props.clicked === "revealed"
          ? "square-revealed"
          : props.clicked === "locked"
          ? "square-locked"
          : "square-hide"
      }
      `}
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
