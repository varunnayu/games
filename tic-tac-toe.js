const board = Array(9).fill(null);
let currentPlayer = "X";
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("ticTacToeMessage");
const restartBtn = document.getElementById("restartTicTacToe");

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes(null) ? null : "Draw";
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!board[index]) {
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    const winner = checkWinner();
    if (winner) {
      message.textContent = winner === "Draw" ? "It's a draw!" : `${winner} wins!`;
      cells.forEach(cell => cell.removeEventListener("click", handleClick));
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function restartGame() {
  board.fill(null);
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.addEventListener("click", handleClick);
  });
  message.textContent = "";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);
