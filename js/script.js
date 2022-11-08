const unorderedList = document.querySelector(".guessed-letters");
//The unordered list where the player’s guessed letters will appear.
const guessButton = document.querySelector(".guess");
//The button with the text “Guess!” in it.
const wordInProgress = document.querySelector(".word-in-progress");

const letterInput = document.querySelector(".letter");

const GuessesRemaining = document.querySelector(".remaining");
//The paragraph where the remaining guesses will display.
const remainingGuessessSpan = document.querySelector(".remaining span");
//The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message");
//The empty paragraph where messages will appear when the player guesses a letter.
const playAgainButton = document.querySelector(".play-again");
//The hidden button that will appear prompting the player to play again.
const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
    const placeholderLetters = [];
       for (const letter of word) {
       //console.log(letter);
       placeholderLetters.push("●");
    }
   wordInProgress.innerText = placeholderLetters.join(""); 
};
placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    //console.log(guess);
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
 });

 const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "You did not guess a letter";
    } else if (input.length > 1) {
        message.innerText = "Only 1 letter please";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Enter a value between a and z";
    } else {
        return input;
    }
 };

 const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showLetters();
        updateWordInProgress(guessedLetters);
    }
 };

 const showLetters = function () {
    unorderedList.innerHTML = "";
    for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    unorderedList.append(li);
    }
 };

 const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    guessCorrectly();
 };

 const guessCorrectly = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add(".win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
 };