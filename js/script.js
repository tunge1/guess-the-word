const unorderedList = document.querySelector(".guessed-letters");
//The unordered list where the player’s guessed letters will appear.
const guessButton = document.querySelector(".guess");
//The button with the text “Guess!” in it.
const wordInProgress = document.querySelector(".word-in-progress");
//The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear.
const guessesremaining = document.querySelector(".remaining");
//The paragraph where the remaining guesses will display.
const remainingGuessessSpan = document.querySelector("span");
//The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message");
//The empty paragraph where messages will appear when the player guesses a letter.
const playAgainButton = document.querySelector(".play-again");
//The hidden button that will appear prompting the player to play again.
const word = "magnolia";

const placeholder = function (word) {
    const guesses = [];
       for (const letter of word) {
       console.log(letter);
       guesses.push("●");
    }
   wordInProgress.innerText = guesses.join(""); 
};
placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const capture = letterInput.value;
    console.log(capture);
    letterInput.value = "";
 });
