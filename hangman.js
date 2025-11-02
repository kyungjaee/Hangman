
var POSSIBLE_WORDS = ["obdurate", "verisimilitude", "defenestrate", "obsequious", "toady", "idempotent"];
var MAX_GUESSES = 6;


var word = "";
var guesses = "";
var guess_count = MAX_GUESSES;
var gameOver = false;

// building a clue string
function makeClue() {
  var clueString = "";
  for (var i = 0; i < word.length; i++) {
    var currentLetter = word.charAt(i);
    if (guesses.indexOf(currentLetter) >= 0) {
      clueString += currentLetter + " ";
    } else {
      clueString += "_ ";
    }
  }
  return clueString;
}

//updates page
function updatePage(message) {
  
  var clue = document.getElementById("clue");
  clue.textContent = makeClue();

  
  var guessArea = document.getElementById("guesses");
  var guessedList = guesses ? "Guessed Letters: " + guesses.split("").join(", ") : "Guessed Letters: None yet";
  guessArea.textContent = message ? (guessedList + " | " + message) : guessedList;

  // I couldn't figure out why images wouldn't show up, had help with this part 
  var image = document.querySelector("img");
  if (image) {
    image.src = "images/hangman" + guess_count + ".gif";
    image.alt = "Hangman stage " + guess_count;
  }
}


function newGame() {
  var randomIndex = parseInt(Math.random() * POSSIBLE_WORDS.length); 
  word = POSSIBLE_WORDS(randomIndex);
  guesses = "";
  guess_count = MAX_GUESSES;
  updatePage();
}


//deals with the guesses of letters
function guessLetter() {
  var input = document.getElementById("guess");
  var letter = (input.value || "").toLowerCase();
  input.value = "";
  input.focus();

  //won't allow guesses before the word is chosen 
  if (word === "") {
    updatePage("Press New game first!");
    return;
  }

  //stops game if it's already guessed 
  if (gameOver) {
    updatePage("Game is over. Press New game.");
    return;
  }

  // use every letter in alphabet 
  if (letter.length !== 1 || letter < "a" || letter > "z") {
    updatePage("Please enter one letter (A–Z).");
    return;
  }

// prevents duplicating letters
  if (guesses.indexOf(letter) >= 0) {
    updatePage("You already guessed that letter.");
    return;
  }

  // records the guess
  guesses += letter;

  // wrong guess reduces the tries
  if (word.indexOf(letter) < 0) {
    guess_count = Math.max(0, guess_count - 1);
  }

//updates page
  updatePage();

  
  if (makeClue().indexOf("_") === -1) {
    gameOver = true;
    document.getElementById("guess").disabled = true;
    updatePage("You won! The word was " + word.toUpperCase() + ".");
    return;
  }

  
  if (guess_count <= 0) {
    gameOver = true;
    document.getElementById("guess").disabled = true;
    updatePage("You lost! The word was " + word.toUpperCase() + ".");
    return;
  }
};


