function KnightMovement(columnDiff, rowDiff) {
  if (columnDiff === 1 && rowDiff === 2) {
    return true;
  } else if (columnDiff === 2 && rowDiff === 1) {
    return true;
  }
}

export default KnightMovement;
