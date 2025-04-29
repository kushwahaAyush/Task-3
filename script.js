
let board;
let currentPlayer;
let gameOver;

// All possible winning combinations (rows, columns, diagonals)
const winCombinations = [
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]           
];

// Create the board and start the game
function startGame() {
  board = Array(9).fill(null); 
  currentPlayer = 'X'; 
  gameOver = false;

  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';

  // Create 9 clickable cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i; // Save the index for later
    cell.addEventListener('click', handleCellClick);
    boardDiv.appendChild(cell);
  }

  document.getElementById('message').textContent = `Player ${currentPlayer}'s Turn`;
}

// Handle clicking on a cell
function handleCellClick(e) {
  const index = e.target.dataset.index;

  // If cell is already filled or game is over, ignore click
  if (board[index] || gameOver) {
    return;
  }

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    document.getElementById('message').textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameOver = true;
  } else if (board.every(cell => cell)) {
    document.getElementById('message').textContent = "It's a Draw! 🤝";
    gameOver = true;
  } else {

    // this code for the switching the player 
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('message').textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Check for a winning combination
function checkWinner() {
  return winCombinations.some(combination => {

    // Check if all 3 cells in a combination are the same as current player
    return combination.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  startGame();
}

startGame();
