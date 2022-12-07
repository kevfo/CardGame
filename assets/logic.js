const selectors = {
  boardContainer : document.querySelector('.board-container'),
  board : document.querySelector('.board'),
  moves : document.querySelector('.moves'),
  timer : document.querySelector('.timer'),
  start : document.querySelector('button'),
  win : document.querySelector('.win')
}

const state = {
  hasStarted : false,
  flipped : 0,
  totalFlips : 0,
  totalTime : 0,
  loop : null
}

// Picks according to the Fisher Yates algorithm:
function pickRandom(array, items) {
  const clonedArray = array;
  const randomPicks = [];

  for (let i = 0 ; i < items ; i++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length);

    randomPicks.push(clonedArray[randomIndex]);
    clonedArray.splice(randomIndex, 1);
  }

  return randomPicks;
}

function shuffle(array) {
  const clonedArray = array;

  for (let i = clonedArray.length - 1 ; i > 0 ; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const original = clonedArray[i];

    clonedArray[i] = clonedArray[randomIndex];
    clonedArray[randomIndex] = original;
  }

  return clonedArray;
}

// Picks the emojis depending on which button gets pressed:
function pickContents(difficulty) {
  switch(difficulty) {
    case "easy":
      return easyCards;
    case "medium":
      return mediumCards;
    case "hard":
      return hardCards;
    default:
      throw new Error("Pick a proper difficulty!")
  }
}

// Makes the modal disappear and loads in the cards:
function generateGame(difficulty) {
  let selectionMenu = document.querySelector('.selectionMenu') ; selectionMenu.style.display = 'none';
  let game = document.querySelector('.game') ; game.style.display = 'block';
  let things = pickContents(difficulty);
  let usedItems = [], cards = [];

  // Make the selections:
  let queryBoard = document.querySelector('.board');

  const dimensions = queryBoard.getAttribute('data-dimension');

  if (dimensions % 2 !== 0) {
    throw new Error("'data-dimension' must be an even number!");
  }

  const picks = pickRandom([0, 1, 2, 3, 4, 5, 6, 7, 8], (dimensions * dimensions) / 2);
  const items = shuffle([...picks, ...picks]);

  cards = generateCardContent(difficulty, items);

  let board = `
  <div class = 'board' style = 'grid-template-columns: repeat(${dimensions}, auto)'>
    ${cards.join(' ')}
  </div>
  `
  // console.log(usedItems) ; console.log(cards);
  const parser = new DOMParser().parseFromString(board, 'text/html')
  queryBoard.replaceWith(parser.querySelector('.board'))
}

function attachEventListeners() {
  document.addEventListener('click', event => {
    const eventTarget = event.target;
    const eventParent = eventTarget.parentElement;

    if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
      flipCard(eventParent);
    } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
      startGame();
    }
  })
}

function startGame() {
  state.hasStarted = true;
  selectors.start.classList.add('disabled');

  state.loop = setInterval(() => {
    state.totalTime++;

    // selectors.moves.innerText = `${state.totalFlips} moves`;
    // selectors.timer.innerText = `Total: ${state.totalTime} seconds`
  }, 1000)
}

// Functions to help flip cards:

function flipBackCards() {
  document.querySelectorAll('.card:not(.matched)').forEach(card => {
    card.classList.remove('flipped')
  })

  state.flipped = 0;
}

// Function to help re-start the game:
function restartGame() {
  let selectionMenu = document.querySelector('#selectionMenu');
  let gameComplete = document.querySelector('.win')
  // selectionMenu.style.display = 'block';
  // gameComplete.style.display = 'none';

  gameComplete.classList = 'selectionMenu';

}

function flipCard(card) {
  state.flipped++;
  state.totalFlips++;

  if (!state.hasStarted) {
    startGame();
  }

  if (state.flipped <= 2) {
    card.classList.add('flipped');
  }

  if (state.flipped === 2) {
    const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

    if (flippedCards[0].id === flippedCards[1].id) {
      flippedCards[0].classList.add('matched');
      flippedCards[1].classList.add('matched');
    } else if (flippedCards[0].innerText !== '' || flippedCards[1].innerText !== '') {
      if (flippedCards[0].innerText === flippedCards[1].innerText) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
      }
    }

    setTimeout(() => {
      flipBackCards();
    }, 1000)
  }

  if (!document.querySelectorAll('.card:not(.flipped)').length) {
    setTimeout(() => {
      selectors.boardContainer.classList.add('flipped');

      // If this is the case:
      selectors.win.style.display = 'block';
      selectors.win.innerHTML = `
        <span class = "win-text">
          Congratulations! <br /> <br />
          You won <br />
          with <span class = "highlight"> ${state.totalFlips} </span> moves! <br /> <br />
          <button onclick = "restartGame()"> Play again! </button>
        </span>
      `

      clearInterval(state.loop);
    }, 1000)
  }
}

// Function to start game:

// generateGame();
attachEventListeners();
