🎮 Guess The Word

Guess The Word is a simple word-guessing game built with HTML, CSS, and Vanilla JavaScript.
The goal is to guess a 6-letter word within a limited number of attempts.

🚀 Features

🔄 Loading screen that appears at the start of the game.

🎯 Limited attempts → 6 tries to guess the word.

🔠 Smooth input navigation:

Auto-focus on the next input after typing a letter.

Supports Backspace & Arrow keys for navigation.

💡 Hints system: player has 2 hints to reveal random correct letters.

🟩 Letter status highlighting:

✅ Correct and in the right position (correct)

🔶 Exists in the word but wrong position (not-in-place)

❌ Not in the word (not-in-word)

🏆 Win state: congratulatory popup showing the number of tries used.

💀 Lose state: game over popup displaying the correct word.

⌨️ Keyboard shortcuts:

Enter → check guess

Escape → close popup

⚙️ Game Logic

Game Settings:

numOfTries = 6 → number of tries.

numOfLetters = 6 → word length.

numOfHints = 2 → available hints.

Word Selection:

A random word is picked from a predefined array of 20 programming-related words (e.g., syntax, buffer, commit, server).

Input Generation:

Each try generates a row of 6 input fields.

Only the first row is enabled at the start; the others remain disabled.

Guessing Process:

When pressing Check button or Enter:

Each letter is compared with the target word.

The input is styled accordingly (correct, not-in-place, not-in-word).

If all letters are correct → show Win popup.

If incorrect → disable current row and enable the next one.

Hints System:

When the Hint button is clicked:

A random empty input in the current row is filled with the correct letter.

That input becomes disabled.

Remaining hints decrease until none are left.

Game End Conditions:

Win: player guesses the word before using all attempts.

Lose: after 6 failed tries, the correct word is revealed in a Game Over popup.

🛠️ Technologies Used

HTML5 → structure

CSS3 → styling & loader animation

JavaScript (Vanilla) → game logic, DOM manipulation, input handling

📂 Project Structure
/guess-the-word
│── index.html # main HTML file
│── style.css # game styling + loader
│── script.js # core game logic
│── README.md # documentation

🎯 How to Play

Open the game in your browser.

Type one letter in each input box to guess the 6-letter word.

Use the Check button or press Enter to submit your guess.

Use Hints if you get stuck (limited to 2).

Win by guessing the word correctly before all attempts are used!
