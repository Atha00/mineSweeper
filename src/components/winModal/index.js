import React from "react";
import "./style.css";

function WinModal(props) {
  return (
    <div className="modal-global">
      <div className="modal-window">
        <p>!!! °~]GG[~° !!!</p>
        <p>Voulez-vous enregistrer votre score ?</p>
        <p>{`Difficulty : ${props.difficulty}`}</p>
        <div className="modal-input-score">
          <input
            name="pseudo"
            value={props.pseudo}
            onChange={event => {
              props.setPseudo(event.target.value);
            }}
          />
          <span>{`Score : ${props.time}`}</span>
        </div>
        <button
          onClick={() => {
            props.saveScore(props.difficulty, props.pseudo, props.time);
            props.setIsTheGameIsWin(false);
          }}
        >
          Valider
        </button>
      </div>
    </div>
  );
}

export default WinModal;
