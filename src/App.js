import React, { useState } from "react";
import "./App.css";
import Board from "./components/board";

function App() {
  let emptyFilling = [];
  for (let i = 0; i < 81; i++) {
    emptyFilling.push({ value: "", clicked: false });
  }

  const [squaresValues, setSquaresValues] = useState(emptyFilling);
  const [isBoardSet, setIsBoardSet] = useState(false);

  const randomNumbersGeneration = firstClickIndex => {
    let tab = [];
    for (let i = 0; i < 10; i++) {
      let currentNumber;
      currentNumber = Math.floor(Math.random() * (80 - 0 + 1)) + 0;
      if (
        tab.indexOf(currentNumber) === -1 &&
        currentNumber !== firstClickIndex
      ) {
        tab.push(currentNumber);
      } else {
        i--;
      }
    }
    return tab;
  };

  const setUpNumbers = (aroundArray, rawFillingArray, i, count, index) => {
    for (let j = 0; j < aroundArray.length; j++) {
      if (
        rawFillingArray[aroundArray[j]] &&
        rawFillingArray[aroundArray[j]].value === "M"
      ) {
        count++;
      }
    }
    if (count !== 0 && rawFillingArray[i].value !== "M") {
      if (i !== index) {
        rawFillingArray.splice(i, 1, { value: count, clicked: false });
      } else {
        rawFillingArray.splice(i, 1, { value: count, clicked: true });
      }
    }
  };

  const showSquare = index => {
    if (!isBoardSet) {
      let rawFillingArray = [...squaresValues];

      //set-up des mines
      let setMinesArray = randomNumbersGeneration(index);
      for (let i = 0; i < setMinesArray.length; i++) {
        rawFillingArray.splice(setMinesArray[i], 1, {
          value: "M",
          clicked: false
        });
      }

      //set-up des chiffres
      for (let i = 0; i < rawFillingArray.length; i++) {
        if (i === 0) {
          let count = 0;
          let aroundArray = [i + 1, i + 9, i + 10];
          setUpNumbers(aroundArray, rawFillingArray, i, count, index);
        } else if (i === 8) {
          let count = 0;
          let aroundArray = [i - 1, i + 8, i + 9];
          setUpNumbers(aroundArray, rawFillingArray, i, count, index);
        } else if (i === 72) {
          let count = 0;
          let aroundArray = [i - 9, i - 8, i + 1];
          setUpNumbers(aroundArray, rawFillingArray, i, count, index);
        } else if (i === 80) {
          let count = 0;
          let aroundArray = [i - 10, i - 9, i - 1];
          setUpNumbers(aroundArray, rawFillingArray, i, count, index);
        } else if (i > 0 && i < 8) {
          let count = 0;
          let aroundArray = [i - 1, i + 1, i + 8, i + 9, i + 10];
          setUpNumbers(aroundArray, rawFillingArray, i, count, index);
        } else if (i % 9 === 0 && i !== 0 && i !== 72) {
          let count = 0;
          let aroundArray = [i - 9, i - 8, i + 1, i + 9, i + 10];
          setUpNumbers(aroundArray, rawFillingArray, i, count, index);
        } else if (i % 9 === 8 && i !== 8 && i !== 80) {
          let count = 0;
          let aroundArray = [i - 10, i - 9, i - 1, i + 8, i + 9];
          setUpNumbers(aroundArray, rawFillingArray, i, count, index);
        } else if (i > 72 && i < 80) {
          let count = 0;
          let aroundArray = [i - 10, i - 9, i - 8, i - 1, i + 1];
          setUpNumbers(aroundArray, rawFillingArray, i, count, index);
        } else {
          let count = 0;
          let aroundArray = [
            i - 10,
            i - 9,
            i - 8,
            i - 1,
            i + 1,
            i + 8,
            i + 9,
            i + 10
          ];
          setUpNumbers(aroundArray, rawFillingArray, i, count, index);
        }
      }
      if (rawFillingArray[index].value === "") {
        let checkedSquares = [];
        rawFillingArray = emptySlotDiscover(
          rawFillingArray,
          index,
          checkedSquares
        );
      }
      setSquaresValues(rawFillingArray);
      setIsBoardSet(!isBoardSet);
    } else {
      let rawFillingArray = [...squaresValues];
      if (rawFillingArray[index].clicked === false) {
        rawFillingArray[index].clicked = !rawFillingArray[index].clicked;
        if (rawFillingArray[index].value === "") {
          let checkedSquares = [];
          rawFillingArray = emptySlotDiscover(
            rawFillingArray,
            index,
            checkedSquares
          );
        }
        setSquaresValues(rawFillingArray);
      }
    }
  };

  const discoveringAroundEmptySlot = (
    aroundArray,
    array,
    checkedSquares,
    func
  ) => {
    for (let i = 0; i < aroundArray.length; i++) {
      if (
        array[aroundArray[i]] &&
        array[aroundArray[i]].clicked === false &&
        array[aroundArray[i]].value !== "M"
      ) {
        array[aroundArray[i]].clicked = !array[aroundArray[i]].clicked;
        checkedSquares.push(aroundArray[i]);
      }
    }
    for (let j = 0; j < checkedSquares.length; j++) {
      if (array[checkedSquares[j]].value === "") {
        let nextCheckedSquares = [];
        func(array, checkedSquares[j], nextCheckedSquares);
      }
    }
  };

  const emptySlotDiscover = (array, index, checkedSquares) => {
    if (index === 0) {
      let aroundArray = [index + 1, index + 9, index + 10];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else if (index === 8) {
      let aroundArray = [index - 1, index + 8, index + 9];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else if (index === 72) {
      let aroundArray = [index - 9, index - 8, index + 1];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else if (index === 80) {
      let aroundArray = [index - 10, index - 9, index - 1];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else if (index > 0 && index < 8) {
      let aroundArray = [
        index - 1,
        index + 1,
        index + 8,
        index + 9,
        index + 10
      ];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else if (index % 9 === 0 && index !== 0 && index !== 72) {
      let aroundArray = [
        index - 9,
        index - 8,
        index + 1,
        index + 9,
        index + 10
      ];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else if (index % 9 === 8 && index !== 8 && index !== 80) {
      let aroundArray = [
        index - 10,
        index - 9,
        index - 1,
        index + 8,
        index + 9
      ];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else if (index > 72 && index < 80) {
      let aroundArray = [
        index - 10,
        index - 9,
        index - 8,
        index - 1,
        index + 1
      ];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else {
      let aroundArray = [
        index - 10,
        index - 9,
        index - 8,
        index - 1,
        index + 1,
        index + 8,
        index + 9,
        index + 10
      ];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    }
    return array;
  };

  const foundMine = index => {
    console.log(index);
  };

  return (
    <div className="App">
      <Board
        value={squaresValues}
        onClickSquare={showSquare}
        onRightClickSquare={foundMine}
      />
    </div>
  );
}

export default App;
