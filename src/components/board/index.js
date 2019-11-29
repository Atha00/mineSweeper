import React from "react";
import Square from "../square";
import "./style.css";

function Board(props) {
  const buildingBoard = (
    width,
    height,
    numberOfMines,
    setCounterOfMines,
    isBoardSet
  ) => {
    if (!isBoardSet && !props.makeMineCounterDynamique) {
      setCounterOfMines(numberOfMines);
      props.setMakeMineCounterDynamique(true);
    }
    let board = [];
    for (let i = 0; i < height; i++) {
      let line = [];
      for (let j = 1; j <= width; j++) {
        line.push(renderingSquare(i * width + j));
      }
      board.push(<div key={i + "a"}>{line}</div>);
    }
    return board;
  };
  const renderingSquare = index => {
    return (
      <Square
        key={index - 1}
        id={index - 1}
        value={props.value[index - 1].value}
        clicked={props.value[index - 1].clicked}
        onClickSquare={props.onClickSquare}
        onRightClickSquare={props.onRightClickSquare}
        index={index - 1}
      />
    );
  };
  return (
    <div className="main-board">
      {buildingBoard(
        props.width,
        props.height,
        props.numberOfMines,
        props.setMineCounter,
        props.isBoardSet
      )}
    </div>
  );
}

export default Board;
