let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

let computerMove = "";
let isAutoPlaying = false;
let intervalId = null;

function updateScore() {
  document.querySelector(".js-score").innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

updateScore(); // Show score on initial load

function pickComputerMove() {
  const randomNum = Math.random();
  if (randomNum < 1 / 3) {
    computerMove = "rock";
  } else if (randomNum < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
}

function playGame(playerMove) {
  pickComputerMove();

  let result = "";
  if (playerMove === computerMove) {
    result = "Tie";
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    result = "You win!";
  } else {
    result = "You lose.";
  }

  if (result === "You win!") {
    score.wins++;
  } else if (result === "You lose.") {
    score.losses++;
  } else {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateScore();

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-compare").innerHTML =
    `You <img src="${playerMove}-emoji.png" alt="${playerMove}"> 
     <img src="${computerMove}-emoji.png" alt="${computerMove}"> Computer`;
}

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const moves = ["rock", "paper", "scissors"];
      const randomIndex = Math.floor(Math.random() * 3);
      const playerMove = moves[randomIndex];
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

// Button event listeners
document.querySelector(".js-rock").addEventListener("click", () => playGame("rock"));
document.querySelector(".js-paper").addEventListener("click", () => playGame("paper"));
document.querySelector(".js-scissors").addEventListener("click", () => playGame("scissors"));
document.querySelector(".js-reset").addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScore();
});
document.querySelector(".js-auto").addEventListener("click", () => autoPlay());

// Keyboard shortcuts
document.body.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === "r") {
    playGame("rock");
  } else if (key === "p") {
    playGame("paper");
  } else if (key === "s") {
    playGame("scissors");
  }else if (key === "enter"){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScore(); 
  }else if (key === "backspace"){
  autoPlay();  
  }
});
