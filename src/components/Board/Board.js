import { useState, useEffect } from "react";
import startingBoard from "../../startingBoardData";
import _ from "lodash";

import "./Board.css";

function Board() {
  const [squares, setSquares] = useState(startingBoard);

  const [isPieceSelected, setIsPieceSelected] = useState(false);

  const [selectedPiece, setSelectedPiece] = useState("");

  const [colorTurn, setColorTurn] = useState("white");

  const [capturedPieces, setCapturedPieces] = useState([]);

  useEffect(() => {
    // console.log(squares);
    console.log(capturedPieces);
    // console.log(selectedPiece);
  }, [squares]);

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
    let { piece, column, row, id, color, hasMoved } = squares[index];

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
    setSelectedPiece({ piece, column, row, id, color, hasMoved });
    // setSelectedPiece(squares[index].piece);
  }

  // Logic for moving a piece implemented
  function movePiece(index) {
    if (!checkPieceMovement(index)) {
      console.log("Not a legal move");
      return;
    }

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
          piece: selectedPiece.piece,
          hasPiece: true,
          hasMoved: true,
          color: colorTurn,
        };
      }

      // If the square being moved to doens't have a piece there, then the piece will move there
      if (obj.id === index && obj.hasPiece === false && obj.color === "") {
        return {
          ...obj,
          piece: selectedPiece.piece,
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

  function checkPieceMovement(index) {
    let newSquareColumn = squares[index].column;
    let newSquareRow = squares[index].row;
    let pieceColumn = selectedPiece.column;
    let pieceRow = selectedPiece.row;
    let pieceColor = selectedPiece.color;
    let pieceMoved = selectedPiece.hasMoved;

    let piece = selectedPiece.piece;
    if (piece === "pawn") {
      return pawnMovement(
        index,
        newSquareColumn,
        newSquareRow,
        pieceColumn,
        pieceRow,
        pieceColor,
        pieceMoved
      );
    } else if (piece === "knight") {
      return true;
    } else if (piece === "bishop") {
    } else if (piece === "rook") {
    } else if (piece === "queen") {
    } else if (piece === "king") {
    }
  }

  function pawnMovement(
    index,
    newSquareColumn,
    newSquareRow,
    pieceColumn,
    pieceRow,
    pieceColor,
    pieceMoved
  ) {
    // Checks color of the pawn, makes sure the pawn stays in the same column, and can't move to a square that has a piece already
    if (pieceColor === "white") {
      if (
        pieceMoved &&
        newSquareRow - 1 === pieceRow &&
        newSquareColumn === pieceColumn &&
        squares[index].hasPiece === false
      ) {
        return true;
      } else if (
        !pieceMoved &&
        newSquareRow === 3 &&
        newSquareColumn === pieceColumn &&
        squares[index].hasPiece === false
      ) {
        return true;
      } else if (
        !pieceMoved &&
        newSquareRow === 4 &&
        newSquareColumn === pieceColumn &&
        squares[index].hasPiece === false
      ) {
        let pieceInTheWay = false;
        for (let i = 0; i < squares.length; i++) {
          if (
            squares[i].row === 3 &&
            squares[i].column === pieceColumn &&
            squares[i].hasPiece
          ) {
            pieceInTheWay = true;
          }
        }
        return !pieceInTheWay;
      } else if (
        newSquareColumn - 1 === pieceColumn &&
        newSquareRow - 1 === pieceRow &&
        squares[index].hasPiece
      ) {
        return true;
      } else if (
        newSquareColumn + 1 === pieceColumn &&
        newSquareRow - 1 === pieceRow &&
        squares[index].hasPiece
      ) {
        return true;
      }
    } else if (pieceColor === "black") {
      if (
        pieceMoved &&
        newSquareRow + 1 === pieceRow &&
        newSquareColumn === pieceColumn &&
        squares[index].hasPiece === false
      ) {
        return true;
      } else if (
        !pieceMoved &&
        newSquareRow === 6 &&
        newSquareColumn === pieceColumn &&
        squares[index].hasPiece === false
      ) {
        return true;
      } else if (
        !pieceMoved &&
        newSquareRow === 5 &&
        newSquareColumn === pieceColumn &&
        squares[index].hasPiece === false
      ) {
        let pieceInTheWay = false;
        for (let i = 0; i < squares.length; i++) {
          if (
            squares[i].row === 6 &&
            squares[i].column === pieceColumn &&
            squares[i].hasPiece
          ) {
            pieceInTheWay = true;
          }
        }
        return !pieceInTheWay;
      } else if (
        newSquareColumn - 1 === pieceColumn &&
        newSquareRow + 1 === pieceRow &&
        squares[index].hasPiece
      ) {
        return true;
      } else if (
        newSquareColumn + 1 === pieceColumn &&
        newSquareRow + 1 === pieceRow &&
        squares[index].hasPiece
      ) {
        return true;
      }
    }
    // if (newSquareColumn === pieceColumn && newSquareRow - 1 === pieceRow) {
    //   return true;
    // } else {
    //   return false;
    // }
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
