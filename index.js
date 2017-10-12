
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
var ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top);

  //Define left edge of DODGER
  const dodgerLeftEdge = positionToInteger(DODGER.style.left);

  //Define right edge of DODGER
  var rightEdge = DODGER.style.left.replace('px', '');
  const dodgerRightEdge = parseInt(rightEdge, 10) + 40;

  //Define left edge of rock
  const rockLeftEdge = positionToInteger(rock.style.left);

  //Define right edge of rock
  var rockRight = rock.style.left.replace('px', '');
  const rockRightEdge = parseInt(rockRight, 10) + 20;

  //Check if edges of rock and dodger meet any of the following and is so,
  //return true;
  if (top > 360) {
    if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) {
      return true;
    } else if (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge ) {
      return true;
    } else if (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) {
      return true;
    }
  }
}

function createRock(x) {
  //Create a div element "rock" repeatedly that appears at the top, then append under #game
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0;
  rock.style.top = `${top}px`;

  document.querySelector('#game').appendChild(rock);

  function moveRock() {
    //Check first if rock has collided with the dodger
    if (checkCollision(rock) === true) {
      endGame();
    } else {
      //if top of rock is above 380px, animate the rock down
      //if tock is below 380px, remove the rock
      var topNumbers = rock.style.top.replace('px','');
      top = parseInt(topNumbers, 10);
      rock.style.top = `${top += 2}px`;

      if (top <= 380) {
        window.requestAnimationFrame(moveRock);
      } else if (top > 380) {
        var game = document.getElementById("game");
        game.removeChild(game.querySelector(".rock"));
      }
    }
  }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);

  return rock;
}

function endGame() {
  //Called if rock hits dodger: remove all rocks, cut the interval which creates the rock
  //and alert the user they lose.
  ROCKS = [];
  clearInterval(gameInterval);
  window.alert("YOU LOSE!");
}

function moveDodger(e) {
  //Creates an event listener for the left or right arrow
  document.addEventListener('keydown', function(e) {
    if (e.which === LEFT_ARROW) {
      moveDodgerLeft();
    } else if (e.which === RIGHT_ARROW) {
      moveDodgerRight();
     }
   });
}

function moveDodgerLeft() {
  //Moves the dodger to the left by 4px
  var leftNumbers = dodger.style.left.replace('px', '');
  var left = parseInt(leftNumbers, 10);

   function move() {
     dodger.style.left = `${left - 4}px`;

     if (left > 0) {
     window.requestAnimationFrame(move);
    }
   }
   window.requestAnimationFrame(move);
}

function moveDodgerRight() {
  //Moves the dodger to the right by 4px
   var leftNumbers = dodger.style.left.replace('px', '');
   var left = parseInt(leftNumbers,10);

   function move() {
     dodger.style.left = `${left + 4}px`;

     if (left < 360) {
       window.requestAnimationFrame(move);
     }
   }
   window.requestAnimationFrame(move);
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}

start();
moveDodger();
