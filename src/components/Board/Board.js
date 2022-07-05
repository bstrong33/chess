import { useState, useEffect } from "react";
import startingBoard from "../../startingBoardData";

function Board() {
  const [squares, setSquares] = useState(startingBoard);

  const [isPieceSelected, setIsPieceSelected] = useState(false);

  const [selectedPiece, setSelectedPiece] = useState("");

  // useEffect(() => {
  //   console.log(squares);
  // }, [squares]);

  function updateBoard(index) {
    if (squares[index].selected === false && squares[index].hasPiece === true) {
      selectPiece(index);
      return;
    }

    if (squares[index].hasPiece === false && isPieceSelected === true) {
      movePiece(index);
    }
  }

  function selectPiece(index) {
    const newState = squares.map((obj) => {
      if (obj.id === index) {
        return { ...obj, selected: true };
      }
      return { ...obj, selected: false };
    });
    setSquares(newState);
    setIsPieceSelected(true);
    setSelectedPiece(squares[index].piece);
  }

  function movePiece(index) {
    const newState = squares.map((obj) => {
      if (obj.id === index && obj.hasPiece === false) {
        // return { ...selectedPiece, selected: false, id: index };
        return {
          ...obj,
          piece: selectedPiece,
          hasPiece: true,
          hasMoved: true,
        };
      }
      if (obj.hasPiece === true && obj.selected === true) {
        return { ...obj, hasPiece: false, selected: false };
      }
      return obj;
    });
    setSquares(newState);
    setIsPieceSelected(false);
    setSelectedPiece("");
  }

  const mappedSquares = squares.map((square) => {
    return (
      <button
        key={square.id}
        className={(square.column + square.row) % 2 === 0 ? "green" : "white"}
        onClick={() => updateBoard(square.id)}
      >
        {square.hasPiece ? square.piece : null}
      </button>
    );
  });

  return <div className="Board">{mappedSquares}</div>;
}

export default Board;
