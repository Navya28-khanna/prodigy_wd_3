// Selectors for game elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

// Game state variables
const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to check if there's a winner
const checkWinner = () => {
  let winner = null;
  winningConditions.forEach((condition) => {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      isGameActive = false;
      statusText.textContent = `${winner} Wins!`;
    }
  });

  if (!board.includes("") && winner === null) {
    isGameActive = false;
    statusText.textContent = "It's a Draw!";
  }
};

// Handle cell click events
const handleCellClick = (e) => {
  const index = e.target.getAttribute("data-index");

  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();

  if (isGameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
};

// Restart the game
const restartGame = () => {
  board.fill("");
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's Turn";
  cells.forEach((cell) => (cell.textContent = ""));
};

// Event Listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
