
var POSSIBLE_WORDS = ["obdurate", "verisimilitude", "defenestrate", "obsequious", "toady", "idempotent"];
var MAX_GUESSES = 6;


var word = "";
var guesses = "";
var guess_count = MAX_GUESSES;
var gameOver = false;


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


function guessLetter() {
  var input = document.getElementById("guess");
  var letter = (input.value || "").toLowerCase();
  input.value = "";
  input.focus();

  
  if (word === "") {
    updatePage("Press New game first!");
    return;
  }

  
  if (gameOver) {
    updatePage("Game is over. Press New game.");
    return;
  }

  
  if (letter.length !== 1 || letter < "a" || letter > "z") {
    updatePage("Please enter one letter (A–Z).");
    return;
  }


  if (guesses.indexOf(letter) >= 0) {
    updatePage("You already guessed that letter.");
    return;
  }

  
  guesses += letter;

  
  if (word.indexOf(letter) < 0) {
    guess_count = Math.max(0, guess_count - 1);
  }


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


