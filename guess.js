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
  inputsContainer.children[0].children[1].focus();
}

window.onload = function () {
  generateInput();
};
