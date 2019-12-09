import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/board";
import RefreshIcon from "./components/refreshIcon";
import Timer from "./components/timer";
import WinModal from "./components/winModal";
import ScoreBoard from "./components/scoreBoard";

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
  const [isTheGameIsWin, setIsTheGameIsWin] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");

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

  const squareLocation = index => {
    let aroundArray;
    if (index === 0) {
      aroundArray = [index, index + 1, index + width, index + (width + 1)];
    } else if (index === width - 1) {
      aroundArray = [index, index - 1, index + (width - 1), index + width];
    } else if (index === width * (height - 1)) {
      aroundArray = [index, index - width, index - (width - 1), index + 1];
    } else if (index === width * height - 1) {
      aroundArray = [index, index - (width + 1), index - width, index - 1];
    } else if (index > 0 && index < width - 1) {
      aroundArray = [
        index,
        index - 1,
        index + 1,
        index + (width - 1),
        index + width,
        index + (width + 1)
      ];
    } else if (
      index % width === 0 &&
      index !== 0 &&
      index !== width * (height - 1)
    ) {
      aroundArray = [
        index,
        index - width,
        index - (width - 1),
        index + 1,
        index + width,
        index + (width + 1)
      ];
    } else if (
      index % width === width - 1 &&
      index !== width - 1 &&
      index !== width * height - 1
    ) {
      aroundArray = [
        index,
        index - (width + 1),
        index - width,
        index - 1,
        index + (width - 1),
        index + width
      ];
    } else if (index > width * (height - 1) && index < width * height - 1) {
      aroundArray = [
        index,
        index - (width + 1),
        index - width,
        index - (width - 1),
        index - 1,
        index + 1
      ];
    } else {
      aroundArray = [
        index,
        index - (width + 1),
        index - width,
        index - (width - 1),
        index - 1,
        index + 1,
        index + (width - 1),
        index + width,
        index + (width + 1)
      ];
    }
    return aroundArray;
  };

  const randomNumbersGeneration = firstClickIndex => {
    let tab = [];

    for (let i = 0; i < numberOfMines; i++) {
      let currentNumber;
      currentNumber =
        Math.floor(Math.random() * (width * height - 1 - 0 + 1)) + 0;

      let aroundArray = squareLocation(firstClickIndex);
      if (
        tab.indexOf(currentNumber) === -1 &&
        aroundArray.indexOf(currentNumber) === -1
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
          let count = 0;
          let aroundArray = squareLocation(i);
          setUpNumbers(aroundArray, rawFillingArray, i, count, index);
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
            setTimerIsRunning(false);
            setEndGame(true);
            setIsTheGameIsWin(true);
            alert("Félicitations !");
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
    let aroundArray = squareLocation(index);
    discoveringAroundEmptySlot(
      aroundArray,
      array,
      checkedSquares,
      emptySlotDiscover
    );
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
    setIsTheGameIsWin(false);
    setIsBoardSet(false);
    setMineCounter(numberOfMines);
    setTimerIsRunning(false);
    setTime(0);
  };

  if (squaresValues.length > 0) {
    return (
      <div className="full-content">
        <div className="main" style={{ minWidth: `${width * 36 + 100}px` }}>
          {isTheGameIsWin && difficulty !== "Custom" && (
            <WinModal
              time={time}
              pseudo={pseudo}
              setPseudo={setPseudo}
              setIsTheGameIsWin={setIsTheGameIsWin}
              difficulty={difficulty}
            />
          )}
          <div
            className="App"
            style={{
              width: `${width * 36 + 30}px`
            }}
          >
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
            <h4>Set difficulty :</h4>
            <span
              className="difficulty-button"
              onClick={() => {
                setSize({ width: 9, height: 9, numberOfMines: 10 });
                setIsBoardSet(false);
                setTimerIsRunning(false);
                setTime(0);
                setDifficulty("beginner");
                setEndGame(false);
                setIsTheGameIsWin(false);
                setMakeMineCounterDynamique(false);
              }}
            >
              Beginner
            </span>
            <span
              className="difficulty-button"
              onClick={() => {
                setSize({ width: 16, height: 16, numberOfMines: 40 });
                setIsBoardSet(false);
                setTimerIsRunning(false);
                setTime(0);
                setDifficulty("intermediate");
                setEndGame(false);
                setIsTheGameIsWin(false);
                setMakeMineCounterDynamique(false);
              }}
            >
              Intermediate
            </span>
            <span
              className="difficulty-button"
              onClick={() => {
                setSize({ width: 30, height: 16, numberOfMines: 99 });
                setIsBoardSet(false);
                setTimerIsRunning(false);
                setTime(0);
                setDifficulty("expert");
                setEndGame(false);
                setIsTheGameIsWin(false);
                setMakeMineCounterDynamique(false);
              }}
            >
              Expert
            </span>
            <span
              className="difficulty-button"
              onClick={() => {
                setCustomConditions(true);
                setCustomDial(!customDial);
              }}
            >
              Custom
            </span>
            {customDial ? (
              <div className="custom-modal">
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
                    setDifficulty("Custom");
                    setTime(0);
                    setEndGame(false);
                    setIsTheGameIsWin(false);
                    if (
                      parseInt(widthInputChange) >= 5 &&
                      parseInt(widthInputChange) <= 50 &&
                      parseInt(heightInputChange) >= 5 &&
                      parseInt(heightInputChange) <= 50 &&
                      parseInt(minesInputChange) > 0 &&
                      parseInt(widthInputChange) * parseInt(heightInputChange) >
                        parseInt(minesInputChange) + 10
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
                  <div>
                    <p className="custom-conditions">
                      Les paramètres ne sont pas corrects !
                    </p>
                    <p className="custom-conditions">Minimum 1 mine</p>
                    <p className="custom-conditions">Largeur/Hauteur min : 5</p>
                    <p className="custom-conditions">
                      Largeur/Hauteur max : 50
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
        <div className="score-board-container">
          <ScoreBoard difficulty={"beginners"} />
          <ScoreBoard difficulty={"intermediates"} />
          <ScoreBoard difficulty={"experts"} />
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default App;
