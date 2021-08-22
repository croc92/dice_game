'use strict';
// Selecting elements
// players
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
// total scores
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
// current scores
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');
// dice 
const diceElement = document.querySelector('.dice');
// buttons 
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// middle section with image & buttons
const midSection = document.querySelector('.image-btns-sec');
// winner message
const message = document.querySelector('#message');

// declare variables in global scope so that we can use it in initializing function
let totalScore, currentPlayer, secondPlayer, currentScore, playing;
// create a function to initialize settings for New Game button
const initializeTheGame = function () {
    // initial conditions
    // total scores = 0
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    // current scores = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;
    // variables
    totalScore = [0, 0];
    currentPlayer = 0;
    currentScore = 0;
    playing = true;
    // remove winner or loser css effects from player elements
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.remove('player--loser');
    player1Element.classList.remove('player--loser');
    player0Element.classList.remove('player--passive');
    player1Element.classList.remove('player--active');
    // player 0 will be active player at start
    player0Element.classList.add('player--active');
    player1Element.classList.add('player--passive');
    // add button & img and remove winner message
    midSection.classList.remove('hidden');
    message.classList.add('hidden');
    message.classList.remove('message');
}

// start the game
initializeTheGame();


// func for switching player
const switchPlayer = function () {
    document.querySelector(`#current--${currentPlayer}`).textContent = 0;
    currentScore = 0;
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
    player0Element.classList.toggle('player--passive');
    player1Element.classList.toggle('player--passive');

}

btnRoll.addEventListener('click', function () {
    if (playing) {
        // generate random number
        const randomRoll = Math.floor(Math.random() * 6) + 1;
        // display the related dice img on the screen
        diceElement.src = `dice-${randomRoll}.png`;
        // if dice roll !== 1 add roll to current score
        // if dice roll === 1, current score = 0 AND switch player
        if (randomRoll !== 1) {
            currentScore += randomRoll;
            document.querySelector(`#current--${currentPlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // add current player's current score to cur player's total score
        totalScore[currentPlayer] += currentScore;
        document.querySelector(`#score--${currentPlayer}`).textContent = totalScore[currentPlayer];

        // if total score >= 100, current player wins
        // if total score < 100, switch player
        if (totalScore[currentPlayer] >= 42) {
            playing = false;
            secondPlayer = currentPlayer === 0 ? 1 : 0; // secondPlayer: loser

            midSection.classList.add('hidden');
            message.innerHTML = `PLAYER ${currentPlayer + 1} WINS!`
            message.classList.add('message');
            message.classList.remove('hidden');

            document.querySelector(`#current--${currentPlayer}`).textContent = 0;
            document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${secondPlayer}`).classList.remove('player--passive');
            document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${secondPlayer}`).classList.add('player--loser');

        } else {
            switchPlayer();
        }

    }
});

btnNewGame.addEventListener('click', initializeTheGame);