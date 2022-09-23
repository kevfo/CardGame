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

// Picks according to the Fihser Yates algorithm:
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

// Makes the game:
function generateGame() {
  const dimensions = selectors.board.getAttribute('data-dimension');

  if (dimensions % 2 !== 0) {
    throw new Error("'data-dimension' must be an even number!");
  }

  const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍'];
  const picks = pickRandom(emojis, (dimensions * dimensions) / 2);
  const items = shuffle([...picks, ...picks]);
  const cards = `
    <div class = 'board' style = 'grid-template-columns: repeat(${dimensions}, auto)'>
      ${items.map(item => `
        <div class = 'card'>
          <div class = 'card-front'> </div>
          <div class = 'card-back'> ${item} </div>
        </div>
      `).join('')}
    </div>
  `

  const parser = new DOMParser().parseFromString(cards, 'text/html')
  selectors.board.replaceWith(parser.querySelector('.board'))
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

    selectors.moves.innerText = `${state.totalFlips} moves`;
    selectors.timer.innerText = `Total: ${state.totalTime} seconds`
  }, 1000)
}

function flipBackCards() {
  document.querySelectorAll('.card:not(.matched)').forEach(card => {
    card.classList.remove('flipped')
  })

  state.flipped = 0;
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

    if (flippedCards[0].innerText === flippedCards[1].innerText) {
      flippedCards[0].classList.add('matched');
      flippedCards[1].classList.add('matched');
    }

    setTimeout(() => {
      flipBackCards();
    }, 1000)
  }

  if (!document.querySelectorAll('.card:not(.flipped)').length) {
    setTimeout(() => {
      selectors.boardContainer.classList.add('flipped');
      selectors.win.innerHTML = `
        <span class = "win-text">
          You won! <br />
          with <span class = "highlight"> ${state.totalFlips} </span> moves <br />
          under <span class = 'highlight'> ${state.totalTime} </span> seconds!
        </span>
      `

      clearInterval(state.loop);
    }, 1000)
  }
}

generateGame();
attachEventListeners();
