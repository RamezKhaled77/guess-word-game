// Setting the game name
const gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").textContent = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created by Ramez`;

// Setting game options
let numOfTries = 6;
let numOfLetters = 6;
let currTry = 1;

// Manage Words
let wordToGuess = "";
const words = [
  "planet",
  "rocket",
  "silver",
  "jungle",
  "candle",
  "throne",
  "dragon",
  "castle",
  "pirate",
  "forest",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
const popupContainer = document.querySelector(".popup-container");
const popup = document.querySelector(".popup");
const message = document.querySelector(".message");
const closeBtn = document.querySelector(".close");
const guessBtn = document.querySelector(".check");

closeBtn.addEventListener("click", handleClosePopup);
guessBtn.addEventListener("click", handleGuess);
function handleClosePopup() {
  popupContainer.classList.remove("show");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleGuess();
  if (e.key === "Escape") handleClosePopup();
});

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");
  //? Loop for creating Tries
  for (let i = 1; i <= numOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-try");

    //? Loop for creating Inputs for Letters
    for (let j = 1; j <= numOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }
  //!   Focus on the first input of the first try
  inputsContainer.children[0].children[1].focus();

  //!   Disable all inputs except the first one
  const inputsInDisabledTry = document.querySelectorAll(".disabled-try input");
  inputsInDisabledTry.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    const nextInput = inputs[index + 1];
    const previousInput = inputs[index - 1];
    input.addEventListener("input", () => {
      input.value = input.value.toUpperCase();
      //   console.log(input.value, index);
      //* To focus on the next input if the current input is not empty
      if (input.value !== "") nextInput.focus();
    });

    //* To handle backspace and arrow keys
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") nextInput.focus();
      if (e.key === "ArrowLeft" && previousInput) previousInput.focus();
      if (e.key === "Backspace" && input.value === "" && previousInput)
        previousInput.focus();
      if (e.key === "Backspace" && input.value !== "") {
        input.value = "";
      }
    });
  });
}

function handleGuess() {
  let isSuccess = true;
  for (let i = 1; i <= numOfLetters; i++) {
    const tryInp = document.querySelector(`#guess-${currTry}-letter-${i}`);
    const letter = tryInp.value.toLowerCase();
    const correctLetter = wordToGuess[i - 1];
    //! Game Logic
    if (letter === correctLetter) {
      tryInp.classList.add("correct");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      tryInp.classList.add("not-in-place");
      isSuccess = false;
    } else {
      tryInp.classList.add("not-in-word");
      isSuccess = false;
    }
  }

  //*   If user wins
  if (isSuccess) {
    popupContainer.classList.add("show");
    message.innerHTML = `Congrats You Win And The Word Is <span>${wordToGuess}</span>`;

    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-try"));
    guessBtn.disabled = true;
    return;
  }
}

console.log(wordToGuess);

window.onload = function () {
  generateInput();
};
