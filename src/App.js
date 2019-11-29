import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/board";
import RefreshIcon from "./components/refreshIcon";
import Timer from "./components/timer";

function App() {
  const [squaresValues, setSquaresValues] = useState([]);
  const [isBoardSet, setIsBoardSet] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [size, setSize] = useState({ width: 9, height: 9, numberOfMines: 10 });
  const [mineCounter, setMineCounter] = useState(10);
  const [customDial, setCustomDial] = useState(false);
  const [widthInputChange, setWidthInputChange] = useState(5);
  const [heightInputChange, setHeightInputChange] = useState(5);
  const [minesInputChange, setMinesInputChange] = useState(3);
  const [makeMineCounterDynamique, setMakeMineCounterDynamique] = useState(
    false
  );
  const [customConditions, setCustomConditions] = useState(true);

  let width = size.width;
  let height = size.height;
  let numberOfMines = size.numberOfMines;

  useEffect(() => {
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

      if (firstClickIndex === 0) {
        let aroundArray = [
          firstClickIndex,
          firstClickIndex + 1,
          firstClickIndex + width,
          firstClickIndex + (width + 1)
        ];
        if (
          tab.indexOf(currentNumber) === -1 &&
          aroundArray.indexOf(currentNumber) === -1
        ) {
          tab.push(currentNumber);
        } else {
          i--;
        }
      } else if (firstClickIndex === width - 1) {
        let aroundArray = [
          firstClickIndex,
          firstClickIndex - 1,
          firstClickIndex + (width - 1),
          firstClickIndex + width
        ];
        if (
          tab.indexOf(currentNumber) === -1 &&
          aroundArray.indexOf(currentNumber) === -1
        ) {
          tab.push(currentNumber);
        } else {
          i--;
        }
      } else if (firstClickIndex === width * (height - 1)) {
        let aroundArray = [
          firstClickIndex,
          firstClickIndex - width,
          firstClickIndex - (width - 1),
          firstClickIndex + 1
        ];
        if (
          tab.indexOf(currentNumber) === -1 &&
          aroundArray.indexOf(currentNumber) === -1
        ) {
          tab.push(currentNumber);
        } else {
          i--;
        }
      } else if (firstClickIndex === width * height - 1) {
        let aroundArray = [
          firstClickIndex,
          firstClickIndex - (width + 1),
          firstClickIndex - width,
          firstClickIndex - 1
        ];
        if (
          tab.indexOf(currentNumber) === -1 &&
          aroundArray.indexOf(currentNumber) === -1
        ) {
          tab.push(currentNumber);
        } else {
          i--;
        }
      } else if (firstClickIndex > 0 && firstClickIndex < width - 1) {
        let aroundArray = [
          firstClickIndex,
          firstClickIndex - 1,
          firstClickIndex + 1,
          firstClickIndex + (width - 1),
          firstClickIndex + width,
          firstClickIndex + (width + 1)
        ];
        if (
          tab.indexOf(currentNumber) === -1 &&
          aroundArray.indexOf(currentNumber) === -1
        ) {
          tab.push(currentNumber);
        } else {
          i--;
        }
      } else if (
        firstClickIndex % width === 0 &&
        firstClickIndex !== 0 &&
        firstClickIndex !== width * (height - 1)
      ) {
        let aroundArray = [
          firstClickIndex,
          firstClickIndex - width,
          firstClickIndex - (width - 1),
          firstClickIndex + 1,
          firstClickIndex + width,
          firstClickIndex + (width + 1)
        ];
        if (
          tab.indexOf(currentNumber) === -1 &&
          aroundArray.indexOf(currentNumber) === -1
        ) {
          tab.push(currentNumber);
        } else {
          i--;
        }
      } else if (
        firstClickIndex % width === width - 1 &&
        firstClickIndex !== width - 1 &&
        firstClickIndex !== width * height - 1
      ) {
        let aroundArray = [
          firstClickIndex,
          firstClickIndex - (width + 1),
          firstClickIndex - width,
          firstClickIndex - 1,
          firstClickIndex + (width - 1),
          firstClickIndex + width
        ];
        if (
          tab.indexOf(currentNumber) === -1 &&
          aroundArray.indexOf(currentNumber) === -1
        ) {
          tab.push(currentNumber);
        } else {
          i--;
        }
      } else if (
        firstClickIndex > width * (height - 1) &&
        firstClickIndex < width * height - 1
      ) {
        let aroundArray = [
          firstClickIndex,
          firstClickIndex - (width + 1),
          firstClickIndex - width,
          firstClickIndex - (width - 1),
          firstClickIndex - 1,
          firstClickIndex + 1
        ];
        if (
          tab.indexOf(currentNumber) === -1 &&
          aroundArray.indexOf(currentNumber) === -1
        ) {
          tab.push(currentNumber);
        } else {
          i--;
        }
      } else {
        let aroundArray = [
          firstClickIndex,
          firstClickIndex - (width + 1),
          firstClickIndex - width,
          firstClickIndex - (width - 1),
          firstClickIndex - 1,
          firstClickIndex + 1,
          firstClickIndex + (width - 1),
          firstClickIndex + width,
          firstClickIndex + (width + 1)
        ];
        if (
          tab.indexOf(currentNumber) === -1 &&
          aroundArray.indexOf(currentNumber) === -1
        ) {
          tab.push(currentNumber);
        } else {
          i--;
        }
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
        if (rawFillingArray[i].clicked === "locked") {
          rawFillingArray.splice(i, 1, { value: count, clicked: "locked" });
        } else {
          rawFillingArray.splice(i, 1, { value: count, clicked: "hide" });
        }
      } else {
        rawFillingArray.splice(i, 1, { value: count, clicked: "revealed" });
      }
    }
  };

  const showSquare = index => {
    if (!endGame) {
      if (!isBoardSet) {
        setTimerIsRunning(true);
        let rawFillingArray = [...squaresValues];
        //set-up des mines
        let setMinesArray = randomNumbersGeneration(index);
        for (let i = 0; i < setMinesArray.length; i++) {
          if (rawFillingArray[setMinesArray[i]].clicked === "locked") {
            rawFillingArray.splice(setMinesArray[i], 1, {
              value: "M",
              clicked: "locked"
            });
          } else {
            rawFillingArray.splice(setMinesArray[i], 1, {
              value: "M",
              clicked: "hide"
            });
          }
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
          rawFillingArray[index].clicked = "revealed";
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
          if (revealedCount === width * height - numberOfMines) {
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
      if (rawFillingArray[index].clicked === "hide" && mineCounter > 0) {
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
        <div className="App" style={{ width: `${width * 36 + 36}px` }}>
          <div style={{ width: `${width * 36}px` }}>
            <p className="header-board">{mineCounter}</p>

            <RefreshIcon restartGame={restartGame} />
            {timerIsRunning ? (
              <Timer time={time} setTime={setTime} />
            ) : (
              <p className="header-board">{time}</p>
            )}
          </div>
          {squaresValues.length === width * height ? (
            <Board
              width={width}
              height={height}
              value={squaresValues}
              onClickSquare={showSquare}
              onRightClickSquare={foundMine}
              numberOfMines={numberOfMines}
              setMineCounter={setMineCounter}
              isBoardSet={isBoardSet}
              makeMineCounterDynamique={makeMineCounterDynamique}
              setMakeMineCounterDynamique={setMakeMineCounterDynamique}
            />
          ) : null}
        </div>
        <div className="set-difficulty">
          <span
            onClick={() => {
              setSize({ width: 9, height: 9, numberOfMines: 10 });
              setIsBoardSet(false);
              setTimerIsRunning(false);
              setTime(0);
              setEndGame(false);
              setMakeMineCounterDynamique(false);
            }}
          >
            Beginner
          </span>
          <span
            onClick={() => {
              setSize({ width: 16, height: 16, numberOfMines: 40 });
              setIsBoardSet(false);
              setTimerIsRunning(false);
              setTime(0);
              setEndGame(false);
              setMakeMineCounterDynamique(false);
            }}
          >
            Intermediate
          </span>
          <span
            onClick={() => {
              setSize({ width: 30, height: 16, numberOfMines: 99 });
              setIsBoardSet(false);
              setTimerIsRunning(false);
              setTime(0);
              setEndGame(false);
              setMakeMineCounterDynamique(false);
            }}
          >
            Expert
          </span>
          <span
            onClick={() => {
              setCustomConditions(true);
              setCustomDial(!customDial);
            }}
          >
            Custom
          </span>
          {customDial ? (
            <div>
              <span>Width : </span>
              <input
                name="width"
                type="number"
                value={widthInputChange}
                onChange={event => {
                  setWidthInputChange(event.target.value);
                }}
              />
              <span>Height : </span>
              <input
                name="height"
                type="number"
                value={heightInputChange}
                onChange={event => {
                  setHeightInputChange(event.target.value);
                }}
              />
              <span>Mines : </span>
              <input
                name="mines"
                type="number"
                value={minesInputChange}
                onChange={event => {
                  setMinesInputChange(event.target.value);
                }}
              />
              <button
                onClick={() => {
                  setIsBoardSet(false);
                  setTimerIsRunning(false);
                  setTime(0);
                  setEndGame(false);
                  if (
                    parseInt(widthInputChange) >= 5 &&
                    parseInt(widthInputChange) <= 60 &&
                    parseInt(heightInputChange) >= 5 &&
                    parseInt(heightInputChange) <= 60 &&
                    parseInt(minesInputChange) > 0 &&
                    parseInt(widthInputChange) * parseInt(heightInputChange) >
                      parseInt(minesInputChange) + 9
                  ) {
                    setSize({
                      width: parseInt(widthInputChange),
                      height: parseInt(heightInputChange),
                      numberOfMines: parseInt(minesInputChange)
                    });
                    setMakeMineCounterDynamique(false);
                    setCustomDial(false);
                  } else {
                    setCustomConditions(false);
                  }
                }}
              >
                Ok
              </button>
              {customConditions ? null : (
                <p>
                  Les paramètres ne sont pas corrects ! Minimum 1 mine,
                  largeur/hauteur min : 5, largeur/hauteur max : 60
                </p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default App;
