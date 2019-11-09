import React from "react";
import Square from "../square";
import "./style.css";

function Board(props) {
  const renderingSquare = index => {
    return (
      <Square
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
      <div>
        {renderingSquare(1)}
        {renderingSquare(2)}
        {renderingSquare(3)}
        {renderingSquare(4)}
        {renderingSquare(5)}
        {renderingSquare(6)}
        {renderingSquare(7)}
        {renderingSquare(8)}
        {renderingSquare(9)}
      </div>
      <div>
        {renderingSquare(10)}
        {renderingSquare(11)}
        {renderingSquare(12)}
        {renderingSquare(13)}
        {renderingSquare(14)}
        {renderingSquare(15)}
        {renderingSquare(16)}
        {renderingSquare(17)}
        {renderingSquare(18)}
      </div>
      <div>
        {renderingSquare(19)}
        {renderingSquare(20)}
        {renderingSquare(21)}
        {renderingSquare(22)}
        {renderingSquare(23)}
        {renderingSquare(24)}
        {renderingSquare(25)}
        {renderingSquare(26)}
        {renderingSquare(27)}
      </div>
      <div>
        {renderingSquare(28)}
        {renderingSquare(29)}
        {renderingSquare(30)}
        {renderingSquare(31)}
        {renderingSquare(32)}
        {renderingSquare(33)}
        {renderingSquare(34)}
        {renderingSquare(35)}
        {renderingSquare(36)}
      </div>
      <div>
        {renderingSquare(37)}
        {renderingSquare(38)}
        {renderingSquare(39)}
        {renderingSquare(40)}
        {renderingSquare(41)}
        {renderingSquare(42)}
        {renderingSquare(43)}
        {renderingSquare(44)}
        {renderingSquare(45)}
      </div>
      <div>
        {renderingSquare(46)}
        {renderingSquare(47)}
        {renderingSquare(48)}
        {renderingSquare(49)}
        {renderingSquare(50)}
        {renderingSquare(51)}
        {renderingSquare(52)}
        {renderingSquare(53)}
        {renderingSquare(54)}
      </div>
      <div>
        {renderingSquare(55)}
        {renderingSquare(56)}
        {renderingSquare(57)}
        {renderingSquare(58)}
        {renderingSquare(59)}
        {renderingSquare(60)}
        {renderingSquare(61)}
        {renderingSquare(62)}
        {renderingSquare(63)}
      </div>
      <div>
        {renderingSquare(64)}
        {renderingSquare(65)}
        {renderingSquare(66)}
        {renderingSquare(67)}
        {renderingSquare(68)}
        {renderingSquare(69)}
        {renderingSquare(70)}
        {renderingSquare(71)}
        {renderingSquare(72)}
      </div>
      <div>
        {renderingSquare(73)}
        {renderingSquare(74)}
        {renderingSquare(75)}
        {renderingSquare(76)}
        {renderingSquare(77)}
        {renderingSquare(78)}
        {renderingSquare(79)}
        {renderingSquare(80)}
        {renderingSquare(81)}
      </div>
    </div>
  );
}

export default Board;
