// Function to help re-start the game:
function restartGame() {
  let entire = document.querySelector('body');
  entire.innerHTML = `
  <div class = 'selectionMenu'>
    <h1 style = "text-align: center;"> Select a game difficulty: </h1>
    <div class = "difficultyButtons">
      <div class = "butttonGroupings" style="display: flex;flex-direction: column;justify-content: center; ">
        <button onclick = "generateGame('easy')"> Easy </button>
        <p style = "text-align: center;"> No words, only images </p>
      </div>
      <div class = "butttonGroupings" style="display: flex;flex-direction: column;justify-content: center; padding-left: 2em;">
        <button onclick = "generateGame('medium')"> Medium </button>
        <p style = "text-align: center;"> Some descriptions and images </p>
      </div>
      <div class = "butttonGroupings" style="display: flex;flex-direction: column;justify-content: center; padding-left: 2em;">
        <button onclick = "generateGame('hard')"> Hard </button>
        <p style = "text-align: center;"> More facts about biodiversity! </p>
      </div>
    </div>
  </div>

  <!-- Game itself: -->
  <div class="game">
    <h2 class = 'brief'> <strong> Match all the cards! </strong> </h2>
    <div class="board-container">
      <div class="board" data-dimension = '4'>
        <div class="card">
          <div class="card-front"> </div>
          <div class="card-back"> Card back </div>
        </div>
      </div>
      <div class="win"> You won with </div>
    </div>
  </div>
  `

  state.totalFlips = 0; state.hasStarted = false;
  selectors = remakeSelectors();
}

// Moves to selection menu:
function toSelectionMenu() {
  let beginning = document.querySelector('.gameIntro');
  beginning.className = "selectionMenu";
  beginning.innerHTML = `
  <h1 style = "text-align: center;"> Select a game difficulty: </h1>
  <div class = "difficultyButtons">
    <div class = "butttonGroupings" style="display: flex;flex-direction: column;justify-content: center; ">
      <button onclick = "generateGame('easy')"> Easy </button>
      <p style = "text-align: center;"> No words, only images! </p>
    </div>
    <div class = "butttonGroupings" style="display: flex;flex-direction: column;justify-content: center; padding-left: 2em;">
      <button onclick = "generateGame('medium')"> Medium </button>
      <p style = "text-align: center;"> Some descriptions and images! </p>
    </div>
    <div class = "butttonGroupings" style="display: flex;flex-direction: column;justify-content: center; padding-left: 2em;">
      <button onclick = "generateGame('hard')"> Hard </button>
      <p style = "text-align: center;"> More facts about biodiversity! </p>
    </div>
  </div>
  `
}

// Meant to be used within restartGame():
function remakeSelectors() {
  return {
    boardContainer : document.querySelector('.board-container'),
    board : document.querySelector('.board'),
    moves : document.querySelector('.moves'),
    timer : document.querySelector('.timer'),
    start : document.querySelector('button'),
    win : document.querySelector('.win')
  };
}
