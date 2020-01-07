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
            let reg = /^[a-zàäâéèêëïîöôùüû\s]*$/i;
            if (reg.test(props.pseudo)) {
              if (props.pseudo.length >= 3 && props.pseudo.length <= 10) {
                props.saveScore(props.difficulty, props.pseudo, props.time);
                props.setIsTheGameIsWin(false);
              } else {
                alert("Your nick name don't got right length (min 3, max 10)");
              }
            } else {
              alert(
                "Please avoid all special characters from your nick name !"
              );
            }
          }}
        >
          Valider
        </button>
      </div>
    </div>
  );
}

export default WinModal;
