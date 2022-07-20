function BishopMovement(
  newSquareColumn,
  newSquareRow,
  pieceColumn,
  pieceRow,
  squares,
  columnDiff,
  rowDiff
) {
  let lowColumn;
  let highColumn;
  let lowRow;
  let highRow;

  function lowAndHighColumn(column1, column2) {
    if (column1 > column2) {
      lowColumn = column2;
      highColumn = column1;
    } else {
      lowColumn = column1;
      highColumn = column2;
    }
  }

  function lowAndHighRow(row1, row2) {
    if (row1 > row2) {
      lowRow = row2;
      highRow = row1;
    } else {
      lowRow = row1;
      highRow = row2;
    }
  }

  lowAndHighColumn(newSquareColumn, pieceColumn);
  lowAndHighRow(newSquareRow, pieceRow);

  let pieceInTheWay = false;

  for (let i = 0; i < squares.length; i++) {
    if (
      squares[i].column > lowColumn &&
      squares[i].column < highColumn &&
      squares[i].row > lowRow &&
      squares[i].row < highRow &&
      squares[i].column - lowColumn === squares[i].row - lowRow &&
      squares[i].hasPiece
    ) {
      console.log(squares[i]);
      pieceInTheWay = true;
    }
  }

  // Math.abs(squares[i].column - pieceColumn) ===
  //       Math.abs((squares[i].row = pieceRow)) &&

  console.log(
    `columnDiff: ${columnDiff}, rowDiff: ${rowDiff}, lowColumn: ${lowColumn}, highColumn: ${highColumn}, lowRow: ${lowRow}, highRow: ${highRow}`
  );

  if (pieceInTheWay) {
    return false;
  } else if (columnDiff === rowDiff) {
    return true;
  }

  //   if (columnDiff < 4 && rowDiff < 4) {
  //     return true;
  //   }
}

export default BishopMovement;
