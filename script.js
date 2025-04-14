const wordList = ["apple", "grape", "mango", "lemon", "peach"]; // Simulated word list
let secretWord = getRandomWord();
let guesses = [];
let currentGuess = '';

const restartBtn = document.getElementById('restart-btn');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const keyboard = document.getElementById('keyboard');
const wordGuessBoard = document.getElementById('word-guess-board');
const pastGuesses = document.getElementById('past-guesses');

// Initialize the keyboard
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
letters.forEach(letter => {
  const btn = document.createElement('button');
  btn.textContent = letter;
  btn.addEventListener('click', () => handleKeyPress(letter));
  keyboard.appendChild(btn);
});

function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function renderBoard() {
  wordGuessBoard.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('div');
    for (let j = 0; j < 5; j++) {
      const letterBox = document.createElement('div');
      letterBox.classList.add('letter');
      row.appendChild(letterBox);
    }
    wordGuessBoard.appendChild(row);
  }
}

function handleKeyPress(letter) {
  if (currentGuess.length < 5) {
    currentGuess += letter;
    updateBoard();
  }
}

function updateBoard() {
  const currentRow = document.querySelectorAll('#word-guess-board .letter');
  let currentRowIndex = guesses.length * 5;

  currentGuess.split('').forEach((letter, index) => {
    currentRow[currentRowIndex + index].textContent = letter;
  });
}

function checkGuess() {
  if (currentGuess.length === 5) {
    const feedback = getFeedback(currentGuess, secretWord);
    guesses.push({ guess: currentGuess, feedback });
    currentGuess = '';
    renderPastGuesses();
    renderFeedback(feedback);

    if (feedback.every(color => color === 'green')) {
      showPopup('You Win!');
    } else if (guesses.length === 6) {
      showPopup('You Lose!');
    }
  }
}

function getFeedback(guess, secretWord) {
  const feedback = [];
  for (let i = 0; i < 5; i++) {
    if (guess[i] === secretWord[i]) {
      feedback.push('green');
    } else if (secretWord.includes(guess[i])) {
      feedback.push('yellow');
    } else {
      feedback.push('gray');
    }
  }
  return feedback;
}

function renderFeedback(feedback) {
  const currentRow = document.querySelectorAll('#word-guess-board .letter');
  const currentRowIndex = (guesses.length - 1) * 5;

  feedback.forEach((color, index) => {
    currentRow[currentRowIndex + index].classList.add(color);
  });
}

function renderPastGuesses() {
  pastGuesses.innerHTML = '';
  guesses.forEach(guessObj => {
    const guessRow = document.createElement('div');
    guessRow.textContent = guessObj.guess;
    guessRow.classList.add('guess-row');
    guessObj.feedback.forEach((color, index) => {
      const letterBox = document.createElement('span');
      letterBox.classList.add(color);
      letterBox.textContent = guessObj.guess[index];
      guessRow.appendChild(letterBox);
    });
    pastGuesses.appendChild(guessRow);
  });
}

function showPopup(message) {
  popup.classList.remove('hidden');
  popupMessage.textContent = message;
}

function restartGame() {
  secretWord = getRandomWord();
  guesses = [];
  currentGuess = '';
  popup.classList.add('hidden');
  renderBoard();
  renderPastGuesses();
}

restartBtn.addEventListener('click', restartGame);

// Initialize the game
renderBoard();
