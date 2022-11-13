const guessedLettersElement = document.querySelector(".guessed-letters");
//The unordered list where the player’s guessed letters will appear.
const guessButton = document.querySelector(".guess");
//The button with the text “Guess!” in it.
const wordInProgress = document.querySelector(".word-in-progress");

const letterInput = document.querySelector(".letter");

const guessesRemaining = document.querySelector(".remaining");
//The paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span");
//The span inside the paragraph where the remaining guesses will display.
const message = document.querySelector(".message");
//The empty paragraph where messages will appear when the player guesses a letter.
const playAgainButton = document.querySelector(".play-again");
//The hidden button that will appear prompting the player to play again.
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await res.text();
    //console.log(words);
    const wordArray = words.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
    //console.log(letter);
    placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join(""); 
};

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
        countGuessesRemaining(guess);
        updateWordInProgress(guessedLetters);
    }
 };

 const showLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
       const li = document.createElement("li");
       li.innerText = letter;
       guessedLettersElement.append(li);
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

 const countGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = "Not this time.";
        remainingGuesses -= 1;
    } else {
        message.innerText = "You got a letter!";
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `You have 0 guesses remaining.  The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
 };

    const guessCorrectly = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    }
 };

 const startOver = function () {
    guessButton.classList.add("hide");
    guessesRemaining.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
 };

 playAgainButton.addEventListener("click", function (e) {
    message.classList.remove(".win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessButton.classList.remove("hide");
    guessesRemaining.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
 })