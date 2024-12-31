"use strict";

// Selecting elements
const elements = {
  players: [
    document.querySelector(".player--0"),
    document.querySelector(".player--1"),
  ],
  scores: [
    document.getElementById("score--0"),
    document.getElementById("score--1"),
  ],
  currents: [
    document.getElementById("current--0"),
    document.getElementById("current--1"),
  ],
  dice: document.querySelector(".dice"),
  buttons: {
    new: document.querySelector(".btn--new"),
    roll: document.querySelector(".btn--roll"),
    hold: document.querySelector(".btn--hold"),
  },
};

let scores, currentScore, activePlayer, playing;

// Initialize game state
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  elements.dice.classList.add("hidden");
  elements.scores.forEach((score) => (score.textContent = 0));
  elements.currents.forEach((current) => (current.textContent = 0));

  elements.players.forEach((player) => {
    player.classList.remove("player--winner", "player--active");
  });
  elements.players[0].classList.add("player--active");
};

const switchPlayer = () => {
  elements.currents[activePlayer].textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  elements.players.forEach((player) =>
    player.classList.toggle("player--active"),
  );
};

const rollDice = () => {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;
  elements.dice.src = `dice-${dice}.png`;
  elements.dice.classList.remove("hidden");

  if (dice !== 1) {
    currentScore += dice;
    elements.currents[activePlayer].textContent = currentScore;
  } else {
    switchPlayer();
  }
};

const holdScore = () => {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  elements.scores[activePlayer].textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    elements.dice.classList.add("hidden");
    elements.players[activePlayer].classList.add("player--winner");
    elements.players[activePlayer].classList.remove("player--active");
  } else {
    switchPlayer();
  }
};

// Event listeners
elements.buttons.roll.addEventListener("click", rollDice);
elements.buttons.hold.addEventListener("click", holdScore);
elements.buttons.new.addEventListener("click", init);

// Start the game
init();
