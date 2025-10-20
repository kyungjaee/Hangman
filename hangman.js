var POSSIBLE_WORDS = ["obdurate", "verisimilitude", "defenestrate", "obsequious", "toady", "idempotent"];


var word = "";


function newGame() {
    var randomIndex = parseInt(Math.random()*POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS(randomIndex);
    guesses = "";
   
}
    var clue = document.getElementById("clue");
    clue.innerHTML = clueString; 

    function guessLetter() { 
        var input = document.getElementById("guess");
        var letter = input.value;
        guesses += letter;
        updatePage();
}

function updatePage() {
     var clueString = "";
    for(var i = 0;i<word.length;i++) {
        var currentLetter = word.charAt(i);
    if (guesses.indexOf(currentLetter)>= 0)  {//you guessed it
        clueString += currentLetter + " ";
    }
        else 
            clueString+= " _ ";
} 
    var clue = document.getElementById("clue")
    clue.innerHTML = clueString;

    var guessArea = document.getElementById("guesses");
    guessArea.innerHTML = "Guessed Letters:  " + guesses;
}    