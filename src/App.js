import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/board";
import RefreshIcon from "./components/refreshIcon";
import Timer from "./components/timer";

function App() {
  const [squaresValues, setSquaresValues] = useState([]);
  const [isBoardSet, setIsBoardSet] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [mineCounter, setMineCounter] = useState(10);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [size, setSize] = useState({ width: 9, height: 9, numberOfMines: 10 });

  let width = size.width;
  let height = size.height;
  let numberOfMines = size.numberOfMines;
  setMineCounter(numberOfMines);

  useEffect(() => {
    console.log("useEffect de App");

    let emptyFilling = [];
    for (let i = 0; i < width * height; i++) {
      emptyFilling.push({ value: "", clicked: "hide" });
    }
    setSquaresValues(emptyFilling);
  }, [size, width, height]);

  const randomNumbersGeneration = firstClickIndex => {
    let tab = [];
    for (let i = 0; i < numberOfMines; i++) {
      let currentNumber;
      currentNumber =
        Math.floor(Math.random() * (width * height - 1 - 0 + 1)) + 0;
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
        rawFillingArray.splice(i, 1, { value: count, clicked: "hide" });
      } else {
        rawFillingArray.splice(i, 1, { value: count, clicked: "revealed" });
      }
    }
  };

  const showSquare = index => {
    console.log(index);

    if (!endGame) {
      if (!isBoardSet) {
        setTimerIsRunning(true);
        let rawFillingArray = [...squaresValues];
        //set-up des mines
        let setMinesArray = randomNumbersGeneration(index);
        for (let i = 0; i < setMinesArray.length; i++) {
          rawFillingArray.splice(setMinesArray[i], 1, {
            value: "M",
            clicked: "hide"
          });
        }

        //set-up des chiffres
        for (let i = 0; i < rawFillingArray.length; i++) {
          if (i === 0) {
            let count = 0;
            let aroundArray = [i + 1, i + width, i + (width + 1)];
            setUpNumbers(aroundArray, rawFillingArray, i, count, index);
          } else if (i === width - 1) {
            let count = 0;
            let aroundArray = [i - 1, i + (width - 1), i + width];
            setUpNumbers(aroundArray, rawFillingArray, i, count, index);
          } else if (i === width * (height - 1)) {
            let count = 0;
            let aroundArray = [i - width, i - (width - 1), i + 1];
            setUpNumbers(aroundArray, rawFillingArray, i, count, index);
          } else if (i === width * height - 1) {
            let count = 0;
            let aroundArray = [i - (width + 1), i - width, i - 1];
            setUpNumbers(aroundArray, rawFillingArray, i, count, index);
          } else if (i > 0 && i < width - 1) {
            let count = 0;
            let aroundArray = [
              i - 1,
              i + 1,
              i + (width - 1),
              i + width,
              i + (width + 1)
            ];
            setUpNumbers(aroundArray, rawFillingArray, i, count, index);
          } else if (i % width === 0 && i !== 0 && i !== width * (height - 1)) {
            let count = 0;
            let aroundArray = [
              i - width,
              i - (width - 1),
              i + 1,
              i + width,
              i + (width + 1)
            ];
            setUpNumbers(aroundArray, rawFillingArray, i, count, index);
          } else if (
            i % width === width - 1 &&
            i !== width - 1 &&
            i !== width * height - 1
          ) {
            let count = 0;
            let aroundArray = [
              i - (width + 1),
              i - width,
              i - 1,
              i + (width - 1),
              i + width
            ];
            setUpNumbers(aroundArray, rawFillingArray, i, count, index);
          } else if (i > width * (height - 1) && i < width * height - 1) {
            let count = 0;
            let aroundArray = [
              i - (width + 1),
              i - width,
              i - (width - 1),
              i - 1,
              i + 1
            ];
            setUpNumbers(aroundArray, rawFillingArray, i, count, index);
          } else {
            let count = 0;
            let aroundArray = [
              i - (width + 1),
              i - width,
              i - (width - 1),
              i - 1,
              i + 1,
              i + (width - 1),
              i + width,
              i + (width + 1)
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
        if (rawFillingArray[index].clicked === "hide") {
          rawFillingArray[index].clicked = "revealed";
          if (rawFillingArray[index].value === "") {
            let checkedSquares = [];
            rawFillingArray = emptySlotDiscover(
              rawFillingArray,
              index,
              checkedSquares
            );
          } else if (rawFillingArray[index].value === "M") {
            for (let i = 0; i < rawFillingArray.length; i++) {
              if (rawFillingArray[i].value === "M") {
                rawFillingArray[i].clicked = "revealed";
              }
            }
            setTimerIsRunning(false);
            setEndGame(true);
          }
          let revealedCount = 0;
          for (let k = 0; k < rawFillingArray.length; k++) {
            if (rawFillingArray[k].clicked === "revealed") {
              revealedCount = revealedCount + 1;
            }
          }
          setSquaresValues(rawFillingArray);
          if (revealedCount === 71) {
            alert("Félicitations !");
            setTimerIsRunning(false);
            setEndGame(true);
          }
        }
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
        array[aroundArray[i]].clicked === "hide" &&
        array[aroundArray[i]].value !== "M"
      ) {
        array[aroundArray[i]].clicked = "revealed";
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
      let aroundArray = [index + 1, index + width, index + (width + 1)];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else if (index === width - 1) {
      let aroundArray = [index - 1, index + (width - 1), index + width];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else if (index === width * (height - 1)) {
      let aroundArray = [index - width, index - (width - 1), index + 1];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else if (index === width * height - 1) {
      let aroundArray = [index - (width + 1), index - width, index - 1];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else if (index > 0 && index < width - 1) {
      let aroundArray = [
        index - 1,
        index + 1,
        index + (width - 1),
        index + width,
        index + (width + 1)
      ];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else if (
      index % width === 0 &&
      index !== 0 &&
      index !== width * (height - 1)
    ) {
      let aroundArray = [
        index - width,
        index - (width - 1),
        index + 1,
        index + width,
        index + (width + 1)
      ];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else if (
      index % width === width - 1 &&
      index !== width - 1 &&
      index !== width * height - 1
    ) {
      let aroundArray = [
        index - (width + 1),
        index - width,
        index - 1,
        index + (width - 1),
        index + width
      ];
      discoveringAroundEmptySlot(
        aroundArray,
        array,
        checkedSquares,
        emptySlotDiscover
      );
    } else if (index > width * (height - 1) && index < width * height - 1) {
      let aroundArray = [
        index - (width + 1),
        index - width,
        index - (width - 1),
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
        index - (width + 1),
        index - width,
        index - (width - 1),
        index - 1,
        index + 1,
        index + (width - 1),
        index + width,
        index + (width + 1)
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
    if (!endGame) {
      let rawFillingArray = [...squaresValues];
      if (rawFillingArray[index].clicked === "hide") {
        rawFillingArray[index].clicked = "locked";
        setMineCounter(mineCounter - 1);
      } else if (rawFillingArray[index].clicked === "locked") {
        rawFillingArray[index].clicked = "hide";
        setMineCounter(mineCounter + 1);
      }
      setSquaresValues(rawFillingArray);
    }
  };
  const restartGame = () => {
    let emptyFilling = [];
    for (let i = 0; i < width * height; i++) {
      emptyFilling.push({ value: "", clicked: "hide" });
    }
    setSquaresValues(emptyFilling);
    setEndGame(false);
    setIsBoardSet(false);
    setMineCounter(numberOfMines);
    setTimerIsRunning(false);
    setTime(0);
  };

  if (squaresValues.length > 0) {
    return (
      <div>
        <div className="App" style={{ width: `${width * 40 + 36}px` }}>
          <div style={{ width: `${width * 40}px` }}>
            <p>{mineCounter}</p>
            <RefreshIcon restartGame={restartGame} />
            {timerIsRunning ? (
              <Timer time={time} setTime={setTime} />
            ) : (
              <p>{time}</p>
            )}
          </div>
          {squaresValues.length === width * height ? (
            <Board
              width={width}
              height={height}
              value={squaresValues}
              onClickSquare={showSquare}
              onRightClickSquare={foundMine}
            />
          ) : null}
        </div>
        <div className="set-difficulty">
          <span>Beginner</span>
          <span
            onClick={() => {
              setSize({ width: 16, height: 16, numberOfMines: 40 });
              setIsBoardSet(false);
            }}
          >
            Intermediate
          </span>
          <span>Expert</span>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default App;
