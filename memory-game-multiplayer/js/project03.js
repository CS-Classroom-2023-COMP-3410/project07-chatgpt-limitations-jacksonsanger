const gameGrid = document.getElementById("gameGrid");
const restartBtn = document.getElementById("restartBtn");
const startGameBtn = document.getElementById("startGameBtn");
const gridRowsInput = document.getElementById("gridRows");
const gridColsInput = document.getElementById("gridCols");
const welcomeContainer = document.querySelector(".welcome-container");
const gameContainer = document.querySelector(".game-container");

let cards = [];
let flippedCards = [];
let gridRows = 4;
let gridCols = 4;

// make variables to track scores and turns
let currentPlayer = 1;
let playerScores = [0, 0];

// UI elements for multiplayer
const playerTurnDisplay = document.createElement("h2");
const player1ScoreDisplay = document.createElement("span");
const player2ScoreDisplay = document.createElement("span");

playerTurnDisplay.id = "playerTurn";
player1ScoreDisplay.id = "player1Score";
player2ScoreDisplay.id = "player2Score";

// Insert the player info UI before the game grid
const gameInfoContainer = document.createElement("div");
gameInfoContainer.className = "game-info";
gameInfoContainer.appendChild(player1ScoreDisplay);
gameInfoContainer.appendChild(playerTurnDisplay);
gameInfoContainer.appendChild(player2ScoreDisplay);

gameContainer.insertBefore(gameInfoContainer, gameGrid);

// List of animal image filenames
const animalImages = [
  "cat.png", "dog.png", "elephant.png", "fox.png", "lion.png",
  "monkey.png", "panda.png", "rabbit.png", "tiger.png", "zebra.png"
];

startGameBtn.addEventListener("click", () => {
  gridRows = parseInt(gridRowsInput.value);
  gridCols = parseInt(gridColsInput.value);
  const totalCards = gridRows * gridCols;

  if (
    gridRows >= 2 && gridRows <= 10 &&
    gridCols >= 2 && gridCols <= 10 &&
    totalCards % 2 === 0
  ) {
    welcomeContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    initializeGame();
  } else {
    alert("Invalid grid size! Ensure the total number of cards is even and values are between 2 and 10.");
  }
});

function initializeGame() {
  const totalCards = gridRows * gridCols;
  const uniquePairs = totalCards / 2;

  // Select images, cycling if needed
  const selectedImages = [];
  for (let i = 0; i < uniquePairs; i++) {
    selectedImages.push(animalImages[i % animalImages.length]);
  }

  const cardPairs = [...selectedImages, ...selectedImages];
  cards = shuffleArray(cardPairs);
  createGrid();
  resetGameInfo();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createGrid() {
  gameGrid.innerHTML = "";
  gameGrid.style.gridTemplateColumns = `repeat(${gridCols}, 1fr)`;

  cards.forEach((image) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.symbol = image; // Using image filename for matching
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back"><img src="images/${image}" alt="Animal"></div>
      </div>
    `;
    card.addEventListener("click", handleCardClick);
    gameGrid.appendChild(card);
  });
}

function handleCardClick(e) {
  const clickedCard = e.currentTarget;

  if (
    clickedCard.classList.contains("flipped") ||
    clickedCard.classList.contains("matched") ||
    flippedCards.length === 2
  ) {
    return;
  }

  flippedCards.push(clickedCard);
  clickedCard.classList.add("flipped");

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    playerScores[currentPlayer - 1]++;
    //update display
    updateScores();

    flippedCards = [];

    // Check if game is completed
    if (document.querySelectorAll(".card.matched").length === cards.length) {
      setTimeout(() => {
        alert(`Game Over! Player 1: ${playerScores[0]} matches, Player 2: ${playerScores[1]} matches.`);
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
      switchTurn();
    }, 1000);
  }
}

function switchTurn() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurnDisplay();
}

function updateScores() {
  player1ScoreDisplay.textContent = `Player 1 Matches: ${playerScores[0]}`;
  player2ScoreDisplay.textContent = `Player 2 Matches: ${playerScores[1]}`;
}

function updateTurnDisplay() {
  playerTurnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGameInfo() {
  currentPlayer = 1;
  playerScores = [0, 0];

  updateScores();
  updateTurnDisplay();
}

restartBtn.addEventListener("click", () => {
  gameContainer.classList.add("hidden");
  welcomeContainer.classList.remove("hidden");
  resetGameInfo();
});
