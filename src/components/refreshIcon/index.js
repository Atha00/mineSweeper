import React from "react";
import "./style.css";

function RefreshIcon(props) {
  return (
    <button
      className="refresh-button header-board"
      onClick={() => {
        props.restartGame();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="none"
        stroke="#FF0000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        viewBox="0 0 26 26"
      >
        <path d="M2.5 2v6h6m13 14v-6h-6"></path>
        <path d="M22 11.5A10 10 0 003.2 7.2M2 12.5a10 10 0 0018.8 4.2"></path>
      </svg>
    </button>
  );
}

export default RefreshIcon;
