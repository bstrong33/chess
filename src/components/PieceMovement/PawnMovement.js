function PawnMovement(
  index,
  newSquareColumn,
  newSquareRow,
  pieceColumn,
  pieceRow,
  pieceColor,
  pieceMoved,
  squares
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
}

export default PawnMovement;
