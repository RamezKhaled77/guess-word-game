// Global Variables
const popupContainer = document.querySelector(".popup-container");
const popup = document.querySelector(".popup");
const message = document.querySelector(".message");
const closeBtn = document.querySelector(".close");
const guessBtn = document.querySelector(".check");
const hintsSpan = document.querySelector(".hint span");
const hintBtn = document.querySelector(".hint");

// Setting the game name
const gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").textContent = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created by Ramez - Vanilla JS`;

// Simulate loading
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.querySelector(".guess-game").style.display = "flex";
  }, 500); // 0.5s delay
});

// Setting game options
let currTry = 1;
let numOfTries = 6;
let numOfLetters = 6;
let numOfHints = 2;

// Manage Words
let wordToGuess = "";
const words = [
  "script", // JavaScript, scripting
  "syntax", // code syntax
  "object", // OOP concept
  "method", // functions in OOP
  "string", // data type
  "buffer", // memory buffer
  "branch", // Git branch
  "commit", // Git commit
  "cursor", // database cursor
  "import", // import modules
  "export", // export modules
  "socket", // network socket
  "server", // backend server
  "client", // frontend client
  "binary", // binary system
  "docker", // containerization
  "kernel", // OS kernel
  "python", // programming language
  "github", // code hosting
  "deploy", // deployment
];

wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
hintsSpan.textContent = numOfHints;
// Event Listeners
hintBtn.addEventListener("click", handleGetHint);
closeBtn.addEventListener("click", handleClosePopup);
guessBtn.addEventListener("click", handleGuess);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleGuess();
  if (e.key === "Escape") handleClosePopup();
});

// Handle Functions
function handleClosePopup() {
  popupContainer.classList.remove("show");
}
function handleGetHint() {
  let enabledInputs = document.querySelectorAll(`.try-${currTry} input`);
  let emptyEnabledInputs = Array.from(enabledInputs).filter(
    (inp) => inp.value === ""
  );

  // Manage Hints Button
  if (numOfHints > 0) {
    numOfHints--;
    hintsSpan.textContent = numOfHints;
  }
  if (numOfHints === 0) hintBtn.disabled = true;

  // ? If there are empty inputs
  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const IndexToFill = Array.from(enabledInputs).indexOf(randomInput);
    randomInput.value = wordToGuess[IndexToFill].toUpperCase();
    randomInput.disabled = true;
    randomInput.classList.add("correct");
  }
}

// Generate Inputs
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
      //* To focus on the next input if the current input is not empty
      if (input.value !== "" && nextInput) nextInput.focus();
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

// Handle Guess
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

  //*   If user win
  if (isSuccess) {
    popupContainer.classList.add("show");
    message.innerHTML = `<span>Congrats</span>You Get The Word After <span>${currTry} Tries</span>`;

    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-try"));
    guessBtn.disabled = true;
    hintBtn.disabled = true;
  } else {
    //!   If user lose
    // ? Disable the current try and its inputs
    let prevTryDiv = document.querySelector(`.try-${currTry}`);
    let prevAllInputs = document.querySelectorAll(`.try-${currTry} input`);
    prevTryDiv.classList.add("disabled-try");
    prevAllInputs.forEach((inp) => (inp.disabled = true));

    // ? Enable the next try and its inputs and focus on the first input
    currTry += 1;
    if (currTry <= numOfTries) {
      let currTryDiv = document.querySelector(`.try-${currTry}`);
      let currAllInputs = document.querySelectorAll(`.try-${currTry} input`);
      currTryDiv.classList.remove("disabled-try");
      currAllInputs.forEach((inp) => (inp.disabled = false));

      currTryDiv.children[1].focus();

      // ? Check if the game is over
    } else if (currTry > numOfTries) {
      popupContainer.classList.add("show");
      message.innerHTML = `<span>GAME OVER</span> You Lose, The Word Is <span>${wordToGuess}</span>`;
      let allTries = document.querySelectorAll(".inputs > div");
      allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-try"));
      guessBtn.disabled = true;
      hintBtn.disabled = true;
    }
  }
}

window.onload = function () {
  generateInput();
};
