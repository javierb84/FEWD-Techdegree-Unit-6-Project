const qwertyID = document.getElementById('qwerty');
const phraseID = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
const startScreen = document.getElementById('overlay');
const title = document.querySelector('.title');

let missed = 0;

let phrases = ["Hello World", "It is showtime", "With great power comes great responsibilty", "I am the night", "I ran so far away", "Happy Coding", "Javascript rocks"];

const ul = phrase.querySelector('ul');

//Return a random phrase from the 'phrases' array

const getRandomPhraseAsArray = function(arr) {
  let quote = Math.floor(Math.random() * phrases.length);
  let phrasesUpper = arr[quote].toUpperCase();
  let eachLetter = phrasesUpper.split("");
  return eachLetter;
}

//Add letters of the random phrase to the display

const addPhraseToDisplay = function(arr) {
  let eachLetter = getRandomPhraseAsArray(arr);

  for(let i = 0; i < eachLetter.length; i++)
  {
    let letter = eachLetter[i];
    let li = document.createElement('li');
    li.className = 'letter';
    li.textContent = letter;

    if(li.textContent === " ")
    {
      li.className = 'space';
    }

    ul.appendChild(li);
  }
  return eachLetter;

}

//Check if one of the letters in the phrase has been selected

const checkLetter = function(chosenLetter, arr) {
  let letter = null;
  for(let i = 0; i < arr.length; i++) 
  {
    if (chosenLetter.textContent === arr[i].textContent.toLowerCase()) 
    {
      letter = arr[i].textContent.toLowerCase();
      arr[i].classList.add("show");
      arr[i].style.transition = "all 3s ease";
    }

    chosenLetter.classList.add("chosen");
    chosenLetter.setAttribute("disabled", true);
  }
  return letter;
}

//Check if the player/user has won or lost the game

const checkWin = function() {

  let show = document.getElementsByClassName('show');
  let letters = document.getElementsByClassName('letter');
  startButton.textContent = "New Game";

  if(show.length === letters.length) 
  {
    clearGame();
    startScreen.className = 'win';
    startScreen.style.display = "flex";
    title.textContent = "Congatulations - you're a winner!";
  } 
  else if(missed >= 5) 
  {
    clearGame();
    startScreen.className = 'lose';
    startScreen.style.display = "flex";
    title.textContent = "Sorry - no lives left, you lost!";
  }
}

//Check if the Start Game Button has been pressed

startButton.addEventListener('click', function() {
  addPhraseToDisplay(phrases);
  startScreen.style.display = 'none';
});

//Listen for the keyboard keys/letters to be clicked

qwertyID.addEventListener('click', function(e) {
  let foundLetter;
  if(e.target.tagName === "BUTTON")
  {
    let keyClicked = e.target;
    let keyList = ul.children;
    let letters = [];

    for(let i = 0; i < keyList.length; i ++)
    {
      if(keyList[i].className === "letter")
      {
        letters.push(keyList[i]);
      }
    }

    foundLetter = checkLetter(keyClicked, letters);

    if(foundLetter === null)
    {
      let ol = document.querySelector('ol');
      let image = ol.getElementsByTagName('img');
      image[missed].setAttribute('src', 'images/lostHeart.png');
      missed++;
    }
  }

  checkWin();

});

/////////////////////////////////////////////
/// RESET Everything ////////////////////////
/////////////////////////////////////////////


// Reset all the (purple) hearts
function resetHearts() 
{
  let ol = document.querySelector('ol');
  let hearts = ol.querySelectorAll('img');

  for (let i = 0; i < hearts.length; i++) 
  {
    hearts[i].setAttribute('src', 'images/liveHeart.png');
  }
}

//Reset the Phrase
function resetPhrase() 
{
  let chosenPhrase = document.querySelector('ul');
  chosenPhrase.innerHTML = "";
}

// Reset the Phrase and keyboard
function resetKeyboard() 
{
  let keyboardKey = document.querySelectorAll('.chosen');
  for (let i = 0; i < keyboardKey.length; i++) 
  {
    keyboardKey[i].removeAttribute('disabled');
    keyboardKey[i].classList.remove('chosen');
  }
}

// Reset the game
function clearGame() 
{
  //reset the counter 'missed'
  missed = 0;
  
  resetPhrase();
  resetKeyboard();
  resetHearts();
}