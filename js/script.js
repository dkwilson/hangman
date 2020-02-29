//Create DOM variables
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);
const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

let playable = true;

function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        letter => `<span class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</span>
            `
      )
      .join("")}
        `;

  const innerWord = wordEl.innerText.replace(/[ \n]/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won!😁";
    popup.style.display = "flex";

    playable = false;
  }
}

//update wrong letters
function updateWrongLettersEl() {
  //display wrong letters
  wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}${wrongLetters.map(
    letter => `<span>${letter}</span>`
  )}
    `;

  //display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //check if lost
  if (wrongLetters.length == figureParts.length) {
    finalMessage.innerText = "Sorry, bud. You lost 🤷🏽‍♂️😞";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = "flex";

    playable = false;
  }
}

//show notifications
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//keydown letter press
window.addEventListener("keydown", e => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase();

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);

          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);

          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  }
});

//restart game and play again
playAgainBtn.addEventListener("click", () => {
    playable = true;

  //empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();
