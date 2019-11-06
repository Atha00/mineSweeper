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

  const emptySlotDiscover = slot => {};

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

  const showSquare = index => {
    if (!isBoardSet) {
      let rawFillingArray = [...squaresValues];
      rawFillingArray.splice(index, 1, { value: "", clicked: true });

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
      }
      setSquaresValues(rawFillingArray);
      setIsBoardSet(!isBoardSet);
    } else {
      let rawFillingArray = [...squaresValues];
      if (rawFillingArray[index].clicked === false) {
        rawFillingArray[index].clicked = !rawFillingArray[index].clicked;
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
        if (rawFillingArray[index].value === "") {
          for (let i = 0; i < aroundArray.length; i++) {
            if (
              rawFillingArray[aroundArray[i]] &&
              rawFillingArray[aroundArray[i]].clicked === false
            ) {
              rawFillingArray[aroundArray[i]].clicked = !rawFillingArray[
                aroundArray[i]
              ].clicked;
            }
          }
        }
        setSquaresValues(rawFillingArray);
      }
    }
  };

  return (
    <div className="App">
      <Board value={squaresValues} onClickSquare={showSquare} />
    </div>
  );
}

export default App;
