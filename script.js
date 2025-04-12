/*developed by Ram Yadav*/
const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const gameContainer = document.getElementById("game-container");
const startContainer = document.querySelector(".start-container");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const popupClose = document.getElementById("popup-close");
let cells = Array.from(document.getElementsByClassName("cell"));
let currentPlayer = "X";
let boardState = Array(9).fill(null);

const colors = {
  X: "#ff4081",
  O: "#448aff",
  background: ["#ffcc80", "#ffab91", "#b2dfdb", "#90caf9"]
};

function randomBackground() {
  return colors.background[Math.floor(Math.random() * colors.background.length)];
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let combo of winningCombinations) {
    let [a, b, c] = combo;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];
    }
  }
  return boardState.includes(null) ? null : "Draw";
}

function handleClick(event) {
  let index = event.target.dataset.index;
  if (boardState[index] || checkWinner()) return;

  boardState[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.style.color = colors[currentPlayer];
  event.target.style.background = randomBackground();

  let winner = checkWinner();
  if (winner) {
    popupMessage.textContent = winner === "Draw" ? "It's a Draw!" : `${winner} Wins! 🎉`;
    popup.style.display = "block";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function resetGame() {
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.color = "black";
    cell.style.background = "#ffde7d";
  });
  currentPlayer = "X";
  status.textContent = "Player X's Turn";
  popup.style.display = "none";
}

function startGame() {
  startContainer.style.display = "none";
  gameContainer.style.display = "flex";
}

popupClose.addEventListener("click", () => {
  popup.style.display = "none";
  resetGame();
});
// developed by ram yadav
cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
startButton.addEventListener("click", startGame);
