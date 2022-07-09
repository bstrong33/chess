import { useState, useEffect } from "react";
import startingBoard from "../../startingBoardData";

import "./Board.css";

function Board() {
  const [squares, setSquares] = useState(startingBoard);

  const [isPieceSelected, setIsPieceSelected] = useState(false);

  const [selectedPiece, setSelectedPiece] = useState("");

  const [colorTurn, setColorTurn] = useState("white");

  const [capturedPieces, setCapturedPieces] = useState([]);

  // useEffect(() => {
  //   console.log(squares);
  //   console.log(capturedPieces);
  // }, [squares]);

  // Runs all movement for board
  function updateBoard(index) {
    // If a square has a piece of the proper color then the selectPiece function runs
    if (
      squares[index].selected === false &&
      squares[index].hasPiece === true &&
      squares[index].color === colorTurn
    ) {
      selectPiece(index);
      return;
    }

    // If a piece has been selected, then the next square selected will be where the piece moves to
    if (isPieceSelected === true) {
      movePiece(index);
    }
  }

  // Function for selecting a piece
  function selectPiece(index) {
    // Sets the "selected" property for the piece to true
    const newState = squares.map((obj) => {
      if (obj.id === index) {
        return { ...obj, selected: true };
      }
      return { ...obj, selected: false };
    });

    // Updates state that a piece has been selected as well as the type of piece that has been selected
    setSquares(newState);
    setIsPieceSelected(true);
    setSelectedPiece(squares[index].piece);
  }

  // Logic for moving a piece implemented
  function movePiece(index) {
    // Checks if the square being moved to has a piece of the opposite color, if so it pushes this captured piece to state and moves the new piece to this square
    const newState = squares.map((obj) => {
      if (
        obj.id === index &&
        obj.hasPiece === true &&
        obj.color !== colorTurn
      ) {
        setCapturedPieces((prevState) => [...prevState, obj]);
        return {
          ...obj,
          piece: selectedPiece,
          hasPiece: true,
          hasMoved: true,
          color: colorTurn,
        };
      }

      // If the square being moved to doens't have a piece there, then the piece will move there
      if (obj.id === index && obj.hasPiece === false && obj.color === "") {
        return {
          ...obj,
          piece: selectedPiece,
          hasPiece: true,
          hasMoved: true,
          color: colorTurn,
        };
      }

      // Reverts the square that the piece moved from to reflect no longer having a piece or being selected
      if (obj.hasPiece === true && obj.selected === true) {
        return { ...obj, hasPiece: false, selected: false, color: "" };
      }

      // All other squares remain the same
      return obj;
    });

    // Updates state with the piece moving, there is no longer a selected piece, and changes which color's turn it is
    setSquares(newState);
    setIsPieceSelected(false);
    setSelectedPiece("");
    setColorTurn((prevState) => (prevState === "white" ? "black" : "white"));
  }

  const mappedSquares = squares.map((square) => {
    return (
      <button
        key={square.id}
        className={`
          ${square.color}
          ${
            (square.column + square.row) % 2 === 0
              ? "greenSquare"
              : "whiteSquare"
          }
          `}
        // className={`black green`}
        id={square.selected ? "selected" : null}
        onClick={() => updateBoard(square.id)}
      >
        {square.hasPiece ? square.piece : null}
      </button>
    );
  });

  return <div className="Board">{mappedSquares}</div>;
}

export default Board;
